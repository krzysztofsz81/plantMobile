import {
  getDatabase,
  ref,
  onValue,
  Unsubscribe,
  get,
  set,
  equalTo,
  query,
  orderByChild,
  startAt,
  endAt,
} from 'firebase/database';
import { DeviceItem, DeviceStatus, PeripheralItem, Peripheral } from './types';
import timestring from 'timestring';
import { TimelineOption } from '../../types';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
dayjs.extend(quarterOfYear);

export const chartOptionsMap: Record<TimelineOption, string[]> = {
  '1h': ['00m', '10m', '20m', '30m', '40m', '50m', '1h'],
  '1d': ['0:00', '4:00', '8:00', '12:00', '16:00', '20:00', '24:00'],
  '7d': ['Mo.', 'Tu.', 'We.', 'Th.', 'Fr.', 'Sa.', 'Su.'],
};

const pieceMap: Record<TimelineOption, string> = {
  '1h': '10m',
  '1d': '4h',
  '7d': '1d',
}

const dateResetFnMap: Record<TimelineOption, (date: Date) => number> = {
  '1h': (date) => dayjs(date).minute(0).second(0).millisecond(0).valueOf(),
  '1d': (date) => dayjs(date).hour(0).minute(0).second(0).millisecond(0).valueOf(),
  '7d': (date) => dayjs(date).day(0).hour(0).minute(0).second(0).millisecond(0).valueOf(),
};

const computeTimelineQueryValues = (currentDate: Date, option: TimelineOption) => {
  const optionsLength = chartOptionsMap[option].length;
  const piece = timestring(pieceMap[option], 'ms');
  const current = dateResetFnMap[option](currentDate);
  return Array(optionsLength - 1)
    .fill(null)
    .map((_el, index) => {
      const baseAmount = optionsLength - index - 1;
      return [baseAmount - 1, baseAmount].map((amount) => current + piece * amount);
    })
    .reverse();
};

export const listenIsDeviceConnected = (id: string, callback: (value: boolean) => void): Unsubscribe => {
  return onValue(ref(getDatabase(), `devices/${id}/status`), (snapshot) => {
    callback((snapshot.val() as DeviceStatus) === 'CONNECTED');
  });
};

export const pushNotificationToken = async (token: string): Promise<void> => {
  const db = getDatabase();

  const equalToTokenRef = query(ref(db, 'posts'), equalTo(token));
  const snapshotToken = await get(equalToTokenRef);

  // console.log({ snapshotToken, val: snapshotToken.val(), equalToTokenRef });

  // const tokensRef = ref(db, "notificationTokens");
  // const snapshot = await get(tokensRef);

  // const peripheralsSnapshot = await get(peripheralsListRef);
  // const peripherals = Object.values(peripheralsSnapshot.val() || {});
  // if (!peripherals.includes(peripheral.name)) {
  //     const newPeripheralRef = push(peripheralsListRef);
  //     await set(newPeripheralRef, peripheral.name);
  // }
};

export const listenOnDevicesList = (callback: (value: DeviceItem[]) => void): Unsubscribe => {
  return onValue(ref(getDatabase(), 'devices/_list'), (snapshot) => {
    const value = snapshot.val() as Record<string, string>;
    if (value) callback(Object.entries(value).map(([key, name]) => ({ key, name })));
  });
};

export const getDevicePeripheralProperty = async (
  deviceId: string,
  peripheralId: Peripheral,
  property: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (value: any) => void
) => {
  await get(ref(getDatabase(), `devices/${deviceId}/${peripheralId}/${property}`)).then((snapshot) => {
    callback(snapshot.val());
  });
};

export const getDevicePeripheralChangelogs = async (
  deviceId: string,
  peripheralId: Peripheral,
  option: TimelineOption,
  callback: (value: number[]) => void
) => {
  const results: number[] = [];
  const peripheralChangelogRef = ref(getDatabase(), `devices/${deviceId}/changelogs/${peripheralId}`);
  const getAverage = (list: number[]) => list.reduce((a, b) => a + b, 0) / list.length;
  await Promise.all(
    computeTimelineQueryValues(new Date(), option).map(async ([start, end]) => {
      const queryRef = query(peripheralChangelogRef, orderByChild('date'), startAt(start, 'date'), endAt(end, 'date'));
      await get(queryRef).then((snapshot) => {
        const result: number[] = [];
        snapshot.forEach((childSnapshot) => {
          const val = childSnapshot.val();
          if (val) result.push(parseFloat(val.value));
        });
        if (result.length) {
          results.push(parseFloat(getAverage(result).toFixed(2)));
        }
      });
    })
  );
  callback(results);
};

export const setDevicePeripheralProperty = async (
  deviceId: string,
  peripheralId: Peripheral,
  property: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
) => {
  await set(ref(getDatabase(), `devices/${deviceId}/${peripheralId}/${property}`), value);
};

export const listenOnDevicePeripheralProperty = (
  deviceId: string,
  peripheralId: Peripheral,
  property: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (value: any) => void
): Unsubscribe => {
  return onValue(ref(getDatabase(), `devices/${deviceId}/${peripheralId}/${property}`), (snapshot) => {
    callback(snapshot.val());
  });
};

export const listenOnPeriphalsList = (deviceId: string, callback: (value: PeripheralItem[]) => void): Unsubscribe => {
  const db = getDatabase();
  return onValue(ref(db, `devices/${deviceId}/_list`), (snapshot) => {
    const value = snapshot.val() as Record<string, Peripheral>;
    if (value) callback(Object.entries(value).map(([key, name]) => ({ key, name })));
  });
};
