const breakpoints = {
  /** Portrait phone, width < 576px */
  xs: 575.98,
  /** Landscape phone or small tablet, width < 768px */
  sm: 767.98,
  /** Tablet or small desktop, width < 992px */
  md: 991.98,
  /** Desktop or landscape tablet, width < 1200px */
  lg: 1199.98,
  /** Large desktop, width < 1400px */
  xl: 1399.98,
  /** Larger desktop (ultrawide), width >= 1400px */
  xxl: 1400,
};

const devices = {
  /** Large desktop, width < 1400px */
  desktopL: `(max-width: ${breakpoints.xl}px)`,
  /** Desktop or landscape tablet, width < 1200px */
  desktopS: `(max-width: ${breakpoints.lg}px)`,
  /** Tablet or small desktop, width < 992px */
  tablet: `(max-width: ${breakpoints.md}px)`,
  /** Landscape phone or small tablet, width < 768px */
  phoneL: `(max-width: ${breakpoints.sm}px)`,
  /** Portrait phone, width < 576px */
  phoneS: `(max-width: ${breakpoints.xs}px)`,
  /** Larger desktop (ultrawide), width >= 1400px */
  ultrawide: `(min-width: ${breakpoints.xxl}px)`,
};

export {
  devices, breakpoints,
};