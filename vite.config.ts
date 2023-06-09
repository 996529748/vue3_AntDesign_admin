import { defineConfig } from "vite"; //defineConfig 工具函数，这样不用 jsdoc 注解也可以获取类型提示
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite"; //自动导入组件
import ViteComponents from "unplugin-vue-components/vite"; //自动导入组件
import { createHtmlPlugin } from "vite-plugin-html"; //CDN
import externalGlobals from "rollup-plugin-external-globals";//CDN
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'//SVG
import path from 'path'
// 查看打包大小插件
import { visualizer } from 'rollup-plugin-visualizer';
// viteRollup插件文档：https://vite-rollup-plugins.patak.dev/
import commonjs from '@rollup/plugin-commonjs'; // 转换commonjs 模块为es6 模块
const isProd = process.env.isProd === "prod";


// https://vitejs.dev/config/
export default defineConfig({
  // root: process.cwd(), // 项目根目录（index.html 文件所在的位置）,
  base: '/', // 基路径配置
  // mode: 'development', // 模式
  plugins: [
    vue(),
    commonjs(),
    //SVG
    createSvgIconsPlugin({
       // 指定需要缓存的图标文件夹
       iconDirs: [path.resolve(process.cwd(), './src/assets/icons')],
       // 指定symbolId格式
       symbolId: 'icon-[dir]-[name]',
    }),
    visualizer({ open: true }),
    AutoImport({
      // 这里除了引入 vue 以外还可以引入pinia、vue-router、vueuse等，
      // 甚至你还可以使用自定义的配置规则，见 https://github.com/antfu/unplugin-auto-import#configuration
      imports: ["vue", "vue-router"],
    }),
    ViteComponents({
      // dirs 指定组件所在位置，默认为 src/components
      // 配置需要默认导入的自定义组件文件夹，该文件夹下的所有组件都会自动 import
      dirs: ["src/components/"],
      // 配置需要将哪些后缀类型的文件进行自动按需引入
      extensions: ["vue","ts"],
      //解析的 UI 组件库，
      // resolvers: [VantResolver({ importStyle: true })],
      resolvers: [AntDesignVueResolver({ importStyle: false, resolveIcons: true })]
    }),
    //CDN
    createHtmlPlugin({
      inject: {
        data: {
          injectScripts: isProd
            ? {
                css: [
                  // "https://cdn.bootcdn.net/ajax/libs/ant-design-vue/3.2.15/antd.min.css"
                ], 
                js: [
                  "http://43.143.115.206/cdn/js/dayjs.min.js",
                  "http://43.143.115.206/cdn/js/vue.global.prod.js",
                  "http://43.143.115.206/cdn/js/vue-router.global.prod.js",
                  "http://43.143.115.206/cdn/js/axios.js",
                  "http://43.143.115.206/cdn/js/vueDemi.js",
                  "http://43.143.115.206/cdn/js/pinia.iife.prod.min.js",
                ],
              }
            : {},
        },
      },
    }),
  ], //注册插件 vue()  多个用，隔开

  server: {
    // 服务启动时自动打开浏览器
    open: true,
    // 设置为0.0.0.0则所有的地址均能访问,默认是 localhost。如果你希望服务器外部可访问，指定如下 host: '0.0.0.0'，设置之后之后可以访问ip地址
    host: "0.0.0.0",
    // 热更新
    hmr: true,
    port: 8888, // 自定义修改端口---默认3000
    strictPort: true, // 设为true时，若端口已被占用则会直接退出，而不是尝试下一个可用端口。
    https: false, // 启用 TLS + HTTP/2。注意：当 server.proxy 选项 也被使用时，将会仅使用 TLS。这个值也可以是一个传递给 https.createServer() 的 选项对象。
    cors: true, // 为开发服务器配置 CORS。默认启用并允许任何源，传递一个 选项对象 来调整行为或设为 false 表示禁用。
    force: true, // 设置为 true 强制使依赖预构建。
    // 自定义代理规则
    // proxy: {
    //   '/api': {
    //   target: "https://xxxx.com/",
    //   changeOrigin: true,
    //   rewrite: (path) => path.replace(/^/api/, '')
    //   }
    // }
  },

  resolve: {
    //导入时想要省略的扩展名列表
    extensions: [".js", ".vue", ".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
    // 别名设置
    alias: {
      "@": "/src",
      api: "/src/api",
      assets: "/src/assets",
      common:"/src/common",
      copnts: "/src/components",
      config:"/src/config",
      hook:"/src/hook",
      router:"/src/router",
      store:"/src/store",
      view: "/src/view",
    },
  },

  //全局样式配置
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use './src/plugins/vant-variables.scss' as *;`, //此处引入必须添加  as *  添加公共样式sass变量
      },
    },
  },

  json: {
    namedExports: true, // 是否支持从.json文件中进行按名导入
    stringify: false, //  开启此项，导入的 JSON 会被转换为 export default JSON.parse("...") 会禁用按名导入
  },

  //构建选项
  build: {
    //浏览器兼容性  "esnext"|"modules" 设置最终构建的浏览器兼容目标
    target: "modules",
    // 是否自动注入 module preload 的 polyfill
    polyfillModulePreload: true, 
    //指定输出路径
    outDir: "./dist",
    //生成静态资源的存放路径
    assetsDir: "./static",
    //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
    assetsInlineLimit: 4096,
    //启用/禁用 CSS 代码拆分  如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
    cssCodeSplit: true,
    // 允许用户为 CSS 的压缩设置一个不同的浏览器 target 与 build.target 一致
    cssTarget: '', 
    //构建后是否生成 source map 文件
    sourcemap: false,
    //当设置为 true，构建后将会生成 manifest.json 文件
    manifest: false,

    // 设置为 false 可以禁用最小化混淆，
    // 或是用来指定使用哪种混淆器
    // boolean | 'terser' | 'esbuild'
    minify: "terser", //terser 构建后文件体积更小
    //设置为 false 来禁用将构建后的文件写入磁盘
    write: true,
    //默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
    emptyOutDir: true,
    //启用/禁用 gzip 压缩大小报告
    reportCompressedSize: true,
    //chunk 大小警告的限制
    chunkSizeWarningLimit: 2000,
    //传递给 Terser 的更多 minify 选项。
    terserOptions: {
      compress: {
        //生产环境时移除console
        drop_console: true, //打包时删除console
        drop_debugger: true, //打包时删除 debugger
        pure_funcs: ["console.log"],
      },
      output: {
        // 去掉注释内容
        comments: true,
      },
    },
    //自定义底层的 Rollup 打包配置
    // 将文件分开打包
    rollupOptions: {
      // 忽略打包
      external: isProd ? ["vue", "pinia", "vue-router", "vue-demi", "axios"] : [],
      plugins: [
      // cdn配置全局变量 
        externalGlobals({
          vue: "Vue",
          pinia:"Pinia",
          "vue-router":"VueRouter",
          "vue-demi": "VueDemi",
          "axios":"axios",
          "dayjs":"dayjs",
        }),
      ],
      output: {
        manualChunks(id) {
          // node_modules 下文件分包
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
        chunkFileNames: "vendors/[name]-[hash].js", // 三方库文件
        entryFileNames: "static/js/[name]-[hash].js", // entry js文件
        assetFileNames: "[ext]/[name]-[hash].[ext]", // css文件
      },
    },
  },
});
