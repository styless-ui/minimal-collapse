import type { MinimalCollapse as IMinimalCollapse } from "../types/index";

/**
 * Minimal Collapse Class
 */
export class MinimalCollapse implements IMinimalCollapse {
  // ===================
  //  Static
  // ===================

  /** Minimal Collapse Instance */
  private static _instance: MinimalCollapse;

  /**
   * Minimal Collapse Instance Getter
   */
  private static get instance(): MinimalCollapse {
    if (!MinimalCollapse._instance) {
      MinimalCollapse._instance = new MinimalCollapse();
    }
    return MinimalCollapse._instance;
  }

  /**
   * Active Minimal Collapse
   */
  public static activate(): void {
    this.instance._activate();
  }

  /**
   * Deactive Minimal Collapse
   */
  public static deactivate(): void {
    this.instance._deactivate();
  }

  /**
   * Open Collapse
   */
  public static open(element: HTMLElement): void {
    this.instance._open(element);
  }

  /**
   * Close Collapse
   */
  public static close(element: HTMLElement): void {
    this.instance._close(element);
  }

  /**
   * Toggle Collapse
   */
  public static toggle(element: HTMLElement): void {
    this.instance._toggle(element);
  }

  // ===================
  //  Non-Static
  // ===================

  // /** is Active */
  // private _isActive: boolean = false;

  /** Dataset Key Set */
  private datasetKeySet: {
    openTrigger: string;
    closeTrigger: string;
    toggleTrigger: string;
  } = {
    openTrigger: "openCollapse",
    closeTrigger: "closeCollapse",
    toggleTrigger: "toggleCollapse",
  };

  /**
   * Init Instance
   */
  private constructor() {}

  /**
   * Active Minimal Collapse
   */
  private _activate(): void {
    // this._isActive = true;
    window.addEventListener<"click">("click", this._clickListener);
  }

  /**
   * Deactive Minimal Collapse
   */
  private _deactivate(): void {
    window.removeEventListener("click", this._clickListener);
    // this._isActive = false;
  }

  /**
   * click listener
   */
  private _clickListener = (event: Event): void => {
    // if (!this._isActive) {
    //   return;
    // }

    if (!(event.target instanceof HTMLElement)) {
      // Not HTML Element
      return;
    }

    const target: HTMLElement = event.target;

    const targetId: string | null = target.getAttribute("aria-controls");
    if (!targetId) {
      return;
    }

    const element: HTMLElement | null = document.getElementById(targetId);
    if (!element) {
      return;
    }

    if (this.datasetKeySet.openTrigger in target.dataset) {
      // on Click Open Collapse trigger
      // not await
      this._open(element);
    }

    if (this.datasetKeySet.closeTrigger in target.dataset) {
      // on Click Close Collapse trigger
      // not await
      this._close(element);
    }

    if (this.datasetKeySet.toggleTrigger in target.dataset) {
      // on Click Toggle Collapse trigger
      // not await
      this._toggle(element);
    }
  };

  /**
   * Open Collapse
   */
  private async _open(element: HTMLElement): Promise<void> {
    if (element.getAttribute("area-hidden") === "false") {
      return;
    }
    // clear listeners
    element.removeEventListener("transitionend", this._openListener);
    element.removeEventListener("transitionend", this._closeListener);

    // set const height
    element.style.height = window.getComputedStyle(element).height;

    // set listener
    element.addEventListener("transitionend", this._openListener, {
      once: true,
    });

    // set target hight
    let contentHeight: number = 0;
    for (const childNode of Array.from(element.children)) {
      if (!(childNode instanceof HTMLElement)) {
        // Not HTML Element
        continue;
      }
      contentHeight += childNode.offsetHeight;
    }
    element.style.height = `${contentHeight}px`;
  }

  /**
   * Close Collapse
   */
  private async _close(element: HTMLElement): Promise<void> {
    if (element.getAttribute("area-hidden") === "true") {
      return;
    }
    // clear listeners
    element.removeEventListener("transitionend", this._openListener);
    element.removeEventListener("transitionend", this._closeListener);

    // set const height
    element.style.height = window.getComputedStyle(element).height;

    // set listener
    element.addEventListener("transitionend", this._closeListener, {
      once: true,
    });

    element.setAttribute("area-hidden", "true");

    element.offsetHeight; // hack
    element.style.height = "";
  }

  /**
   * Toggle Collapse
   */
  private async _toggle(element: HTMLElement): Promise<void> {
    if (element.getAttribute("area-hidden") !== "false") {
      await this._open(element);
      return;
    }

    if (element.getAttribute("area-hidden") !== "true") {
      await this._close(element);
      return;
    }
  }

  /**
   * Open Event Listener
   */
  private _openListener = (event: Event): void => {
    if (!(event.target instanceof HTMLElement)) {
      // Not HTML Element
      return;
    }
    const target: HTMLElement = event.target;
    target.setAttribute("area-hidden", "false");
    target.style.height = "";
  };

  /**
   * Close Event Listener
   */
  private _closeListener = (event: Event): void => {
    if (!(event.target instanceof HTMLElement)) {
      // Not HTML Element
      return;
    }
  };
}
