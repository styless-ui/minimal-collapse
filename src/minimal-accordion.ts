import type { MinimalAccordion as IMinimalAccordion } from "../types/index";

/**
 * Minimal Accordion Class
 */
export class MinimalAccordion implements IMinimalAccordion {
  // ===================
  //  Static
  // ===================

  /** Minimal Modal Instance */
  private static _instance: MinimalAccordion;

  /**
   * Minimal Modal Instance Getter
   */
  private static get instance(): MinimalAccordion {
    if (!MinimalAccordion._instance) {
      MinimalAccordion._instance = new MinimalAccordion();
    }
    return MinimalAccordion._instance;
  }

  /**
   * Active Minimal Modal
   */
  public static activate(): void {
    this.instance._activate();
  }

  /**
   * Deactive Minimal Modal
   */
  public static deactivate(): void {
    this.instance._deactivate();
  }

  /**
   * Open Accordion
   */
  public static open(accordionElement: HTMLElement): void {
    this.instance._open(accordionElement);
  }

  /**
   * Close Accordion
   */
  public static close(accordionElement: HTMLElement): void {
    this.instance._close(accordionElement);
  }

  /**
   * Toggle Accordion
   */
  public static toggle(accordionElement: HTMLElement): void {
    this.instance._toggle(accordionElement);
  }

  // ===================
  //  Non-Static
  // ===================

  /** is Active */
  private _isActive = false;

  /** Dataset Key Set */
  private datasetKeySet: {
    openTrigger: string;
    closeTrigger: string;
    toggleTrigger: string;
  } = {
    openTrigger: "openAccordion",
    closeTrigger: "closeAccordion",
    toggleTrigger: "toggleAccordion",
  };

  /**
   * Init Instance
   */
  private constructor() {
    window.addEventListener<"click">("click", (event: Event): void => {
      if (!this._isActive) {
        return;
      }

      if (!(event.target instanceof HTMLElement)) {
        // Not HTML Element
        return;
      }

      const target: HTMLElement = event.target;

      const getNodeList = (selector: string | undefined): HTMLElement[] => {
        if (!selector) {
          return [];
        }
        const nodeList: NodeListOf<HTMLElement> = document.querySelectorAll(selector);
        return Array.from(nodeList);
      };

      if (this.datasetKeySet.openTrigger in target.dataset) {
        // on Click Open Accordion trigger
        const nodeList: HTMLElement[] = getNodeList(target.dataset[this.datasetKeySet.openTrigger]);
        // TODO:
        // aria-expanded
        for (const node of nodeList) {
          // not await
          this._open(node);
        }
      }

      if (this.datasetKeySet.closeTrigger in target.dataset) {
        // on Click Close Accordion trigger
        const nodeList: HTMLElement[] = getNodeList(target.dataset[this.datasetKeySet.closeTrigger]);
        // TODO:
        // aria-expanded
        for (const node of nodeList) {
          // not await
          this._close(node);
        }
      }

      if (this.datasetKeySet.toggleTrigger in target.dataset) {
        // on Click Toggle Accordion trigger
        const nodeList: HTMLElement[] = getNodeList(target.dataset[this.datasetKeySet.toggleTrigger]);
        // TODO:
        // aria-expanded
        for (const node of nodeList) {
          // not await
          this._toggle(node);
        }
      }
    });
  }

  /**
   * Active Minimal Accordion
   */
  private _activate(): void {
    this._isActive = true;
  }

  /**
   * Deactive Minimal Accordion
   */
  private _deactivate(): void {
    this._isActive = false;
  }

  /**
   * Open Accordion
   */
  private async _open(node: HTMLElement): Promise<void> {
    if (node.getAttribute("area-hidden") === "false") {
      return;
    }
    // clear listeners
    node.removeEventListener("transitionend", this._openListener);
    node.removeEventListener("transitionend", this._closeListener);

    // set const height
    node.style.height = window.getComputedStyle(node).height;

    // set listener
    node.addEventListener("transitionend", this._openListener, {
      once: true,
    });

    // set target hight
    let contentHeight: number = 0;
    for (const childNode of Array.from(node.children)) {
      if (!(childNode instanceof HTMLElement)) {
        // Not HTML Element
        continue;
      }
      contentHeight += childNode.offsetHeight;
    }
    node.style.height = `${contentHeight}px`;
  }

  /**
   * Close Accordion
   */
  private async _close(node: HTMLElement): Promise<void> {
    if (node.getAttribute("area-hidden") === "true") {
      return;
    }
    // clear listeners
    node.removeEventListener("transitionend", this._openListener);
    node.removeEventListener("transitionend", this._closeListener);

    // set const height
    node.style.height = window.getComputedStyle(node).height;

    // set listener
    node.addEventListener("transitionend", this._closeListener, {
      once: true,
    });

    node.setAttribute("area-hidden", "true");

    node.offsetHeight
    node.style.height = "";
  }

  /**
   * Toggle Accordion
   */
  private async _toggle(node: HTMLElement): Promise<void> {
    if (node.getAttribute("area-hidden") !== "false") {
      await this._open(node);
      return;
    }

    if (node.getAttribute("area-hidden") !== "true") {
      await this._close(node);
      return;
    }
  }

  /**
   * Open Event Listener
   */
  private _openListener(event: Event): void {
    if (!(event.target instanceof HTMLElement)) {
      // Not HTML Element
      return;
    }
    const target: HTMLElement = event.target;
    target.setAttribute("area-hidden", "false");
    // target.style.height = "auto";
    target.style.height = "";
  }

  /**
   * Close Event Listener
   */
  private _closeListener(event: Event): void {
    if (!(event.target instanceof HTMLElement)) {
      // Not HTML Element
      return;
    }
    // const target: HTMLElement = event.target;
    // target.style.height = "";
  }
}
