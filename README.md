ApartmentSys
============

环境搭建

------------

**在这个版本只有简单的登陆功能**

##如何运行工程
1. 要把工程引入gopath, 如工程位置在：d:\ApartmentSys ,在修改环境变量 在gopath中添加 d:\ApartmentSys 
2. 在idea中选择import工程，而不是打开
3. 在idea中设置goDSK的位置
4. 如果在idea中运行不了,如果工程位置在 d:\ApartmentSys ,使用**cmd**命令，cd d: 然后 cd  ApartmentSys\src
   接着 使用go build main.go ，最后 使用 go run main.go 
5. 运行之后 打开 localhost:8186\html\Login.html 看到简单的登陆界面
   端口文件在 conf/app.conf

