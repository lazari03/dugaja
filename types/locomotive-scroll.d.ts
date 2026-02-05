declare module "locomotive-scroll" {
  interface LocomotiveScrollOptions {
    el: HTMLElement;
    smooth?: boolean;
    lerp?: number;
  }

  export default class LocomotiveScroll {
    constructor(options: LocomotiveScrollOptions);
    destroy(): void;
  }
}
