# OEP-WEB:基于React的在线考试平台
* 前言   
学了很久的Vue，对同类型的React也慢慢起了兴趣，这次借要完成毕设的机会下定决心对React以及TypeScript入一下门。

* 初始化项目时,tsx文件报错。删除node_modules后重新执行npm install消除错误，教程中也有提到一些人可能还需要删掉package-lock.json
* ant-design   
npm install antd   
* sass
npm install sass    
参考该[教程](https://www.jianshu.com/p/d3fbd9774931)
* react-router
npm install react-router @types/react-router-dom   
不引入后者会导致import react-router时报错
* 插曲   
&emsp;&emsp;一心想修改入口文件名index为app，找到的方法便是修改webpack.config文件。于是便找寻如何修改使用脚手架创建的React项目的webpack.config文件，发现两种方法：npm run eject 和 添加一个依赖修改运行命。第一种方法是大概原理是使其先读取源码下的config再读取node_modules下的，只为了修改个入口文件不值得。而第二种方法，试了一下，抛出的config文件太多了，所以也放弃。
同时如果执行了该命令，使用git丢弃修改再删除node_modules就可以再次运行了。

