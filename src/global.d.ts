
  declare module '*.jsx' {
    const content: React.ComponentType<JSX.Element>;
    export default content;
  }