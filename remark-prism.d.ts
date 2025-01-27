declare module 'remark-prism' {
  import { Plugin } from 'unified';
  import { Root } from 'mdast';

  type SupportedPlugins = 'line-numbers' | 'otherPlugin'; // Thêm các plugin Prism mà bạn muốn sử dụng

  interface Options {
    transformInlineCode?: boolean;
    plugins?: SupportedPlugins[]; // Cấu hình mảng các plugin Prism
  }

  const remarkPrism: Plugin<[Options?], Root, Root>;

  export default remarkPrism;
}
