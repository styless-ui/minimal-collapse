/**
 * Minimal Accordion Class
 */
export class MinimalAccordion {
  // ===================
  //  Static
  // ===================
  /**
   * Active Minimal Accordion
   */
  public static activate(): void;
  /**
   * Deactive Minimal Accordion
   */
  public static deactivate(): void;
  /**
   * Open Accordion
   */
  public static open(accordionElement: HTMLElement): void;
  /**
   * Close Accordion
   */
  public static close(accordionElement: HTMLElement): void;
  /**
   * Toggle Accordion
   */
  public static toggle(accordionElement: HTMLElement): void;
}
