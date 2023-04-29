import { atom, useAtom } from 'jotai';

const time = atom(60);
export const useTimeAtom = () => useAtom(time);

const pause = atom(false);
export const usePauseAtom = () => useAtom(pause);
