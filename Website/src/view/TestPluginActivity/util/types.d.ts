interface OsOpenOptions {
  target?: string | undefined;
  features?:
    | {
        window?: string | undefined;
        /**
         * Only for Android
         */
        color?: string | undefined;
      }
    | undefined;
}

declare interface BuildConfig {
  get DEBUG(): boolean;
  get APPLICATION_ID(): string;
  get BUILD_TYPE(): string;
  get VERSION_CODE(): string;
  get VERSION_NAME(): string;
}

type Rules = Array<[string, string]>;
interface MdPlugin {
  addRules: (rules: Rules) => void;
}

declare interface Requires {
  // os: typeof os;
  // @ts-ignore
  ons: typeof ons;
  buildconfig: BuildConfig;
}

interface OS {
  readonly isAndroid: boolean;
  readonly isTablet: boolean;
  /**
   * @platform `Android` | `Browser`
   */
  toast(text: string, duration: "long" | "short"): void;
  /**
   * @platform `Android` | `Browser`
   *
   * Usage is restricted on browsers
   */
  close(): void;
  /**
   * @platform `Android` | `Browser`
   */
  open(url?: string | URL | undefined, options?: OsOpenOptions): Window | null;
  /**
   * @platform `Android`
   */
  getMonetColor(id: string): string;
  /**
   * @platform `Android`
   */
  setStatusBarColor(color: string, white: boolean): void;
  /**
   * @platform `Android`
   */
  setNavigationBarColor(color: string): void;
  /**
   * @platform `Android`
   */
  // prettier-ignore
  addNativeEventListener<K extends keyof WindowEventMap>(type: K, callback: () => void, options?: boolean | AddEventListenerOptions): void;
  /**
   * @platform `Android`
   */
  // prettier-ignore
  removeNativeEventListener<K extends keyof WindowEventMap>(type: K, callback: () => void, options?: boolean | AddEventListenerOptions): void;
}

interface AlertOptions {
  message?: string;
  messageHTML?: string;
  buttonLabel?: string;
  buttonLabels?: string[];
  primaryButtonIndex?: number;
  cancelable?: boolean;
  animation?: string;
  title?: string;
  modifier?: string;
  callback?: any;
  id?: string;
}

interface OnsNotification {
  /**
   * @param {Object} options Parameter object
   * @param {String} [options.message] Alert message
   * @param {String} [options.messageHTML] Alert message in HTML
   * @param {String} [options.buttonLabel] Label for confirmation button. Default is "OK"
   * @param {String} [options.animation] Animation name. Available animations are "none", "fade" and "slide"
   * @param {String} [options.title] Dialog title. Default is "Alert"
   * @param {String} [options.modifier] Modifier for the dialog
   * @param {String} [options.id] The `<ons-alert-dialog>` element's ID.
   * @param {Function} [options.callback] Function that executes after dialog has been closed
   * @description
   *   Display an alert dialog to show the user a message
   *   The content of the message can be either simple text or HTML
   *   Must specify either message or messageHTML
   */
  alert(message: string | AlertOptions, options?: AlertOptions): Promise<HTMLElement>;
  /**
   * @param {Object} options Parameter object
   * @param {String} [options.message] Confirmation question
   * @param {String} [options.messageHTML] Dialog content in HTML
   * @param {Array} [options.buttonLabels] Labels for the buttons. Default is ["Cancel", "OK"]
   * @param {Number} [options.primaryButtonIndex] Index of primary button. Default is 1
   * @param {Boolean} [options.cancelable] Whether the dialog is cancelable or not. Default is false
   * @param {String} [options.animation] Animation name. Available animations are "none", "fade" and "slide"
   * @param {String} [options.title] Dialog title. Default is "Confirm"
   * @param {String} [options.modifier] Modifier for the dialog
   * @param {String} [options.id] The `<ons-alert-dialog>` element's ID.
   * @param {Function} [options.callback]
   *   Function that executes after the dialog has been closed
   *   Argument for the function is the index of the button that was pressed or -1 if the dialog was canceled
   * @description
   *   Display a dialog to ask the user for confirmation
   *   The default button labels are "Cancel" and "OK" but they can be customized
   *   Must specify either message or messageHTML
   */
  confirm(message: string | AlertOptions, options?: AlertOptions): Promise<HTMLElement>;
  /**
   * @param {Object} options Parameter object
   * @param {String} [options.message] Prompt question
   * @param {String} [options.messageHTML] Dialog content in HTML
   * @param {String} [options.buttonLabel] Label for confirmation button. Default is "OK"
   * @param {Number} [options.primaryButtonIndex] Index of primary button. Default is 1
   * @param {Boolean} [options.cancelable] Whether the dialog is cancelable or not. Default is false
   * @param {String} [options.animation] Animation name. Available animations are "none", "fade" and "slide"
   * @param {String} [options.title] Dialog title. Default is "Alert"
   * @param {String} [options.modifier] Modifier for the dialog
   * @param {String} [options.id] The `<ons-alert-dialog>` element's ID.
   * @param {Function} [options.callback]
   *   Function that executes after the dialog has been closed
   *   Argument for the function is the value of the input field or null if the dialog was canceled
   * @description
   *   Display a dialog with a prompt to ask the user a question
   *   Must specify either message or messageHTML
   */
  prompt(message: string | AlertOptions, options?: AlertOptions): Promise<HTMLElement>;
  toast(...args: any[]): any;
}

interface ons {
  notification: OnsNotification;
}

interface TypeMap {
  os: OS;
  ons: ons;
  mdplugin: MdPlugin;
}

declare interface KPlugin {
  id: string;
  /**
   * `require()` can only used in plugin context
   */
  require: <T extends keyof TypeMap>(type: T) => TypeMap[T];
}

declare const init: (name: string, callback: (plugin: KPlugin) => void) => void;
