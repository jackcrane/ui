import classNames from "classnames";
import { toast as hotToast } from "react-hot-toast";
import chamferStyles from "../../general/chamfer.module.css";
import styles from "./toast.module.css";

const DEFAULT_DURATION = 420000;
const VALID_VARIANTS = [
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
  "info",
];

const normalizeVariant = (variant) => {
  if (!variant) return "secondary";
  const name = String(variant).toLowerCase();
  return VALID_VARIANTS.includes(name) ? name : "secondary";
};

const buildOptions = (options = {}, variantOverride) => {
  const variant = normalizeVariant(variantOverride ?? options.variant);
  const duration = options.duration ?? DEFAULT_DURATION;
  const className = classNames(
    styles.toastRoot,
    chamferStyles.chamfer,
    styles[variant],
    options.className
  );

  return {
    ...options,
    duration,
    className,
    variant,
  };
};

const emit = (content, options = {}) =>
  hotToast(content, buildOptions(options));

const toast = (content, options = {}) => emit(content, options);
toast.primary = (content, options = {}) =>
  hotToast(content, buildOptions(options, "primary"));
toast.secondary = (content, options = {}) =>
  hotToast(content, buildOptions(options, "secondary"));
toast.success = (content, options = {}) =>
  hotToast.success(content, buildOptions(options, "success"));
toast.warning = (content, options = {}) =>
  hotToast(content, buildOptions(options, "warning"));
toast.danger = (content, options = {}) =>
  hotToast(content, buildOptions(options, "danger"));
toast.info = (content, options = {}) =>
  hotToast(content, buildOptions(options, "info"));
toast.loading = (content, options = {}) =>
  hotToast.loading(content, buildOptions(options, options.variant ?? "info"));
toast.dismiss = hotToast.dismiss;
toast.removeAll = () => {
  hotToast.dismiss();
};
toast.promise = (promise, messages, options = {}) =>
  hotToast.promise(promise, messages, buildOptions(options));

export { toast };
