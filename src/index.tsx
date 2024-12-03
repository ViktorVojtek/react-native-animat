export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b);
}

export { default as Fade } from './Fade';
export type { FadeProps } from './Fade';
export { default as Scale } from './Scale';
export type { ScaleProps } from './Scale';
export { default as Slide } from './Slide';
export type { SlideProps } from './Slide';
export { default as Stack } from './Stack';
export type { StackProps } from './Stack';
export { default as Rotate } from './Rotate';
export type { RotateProps } from './Rotate';
