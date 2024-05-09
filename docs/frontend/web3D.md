## 11.1 基本介绍

`web3D`主要有一下三中技术栈
1. `WebGL`：基于`OpenGL ES 2.0`的`JavaScript`实现的 2D或3D`渲染API        
2. `WebGPU`：是一种新的Web标准，提供了更底层、更直接的访问 `GPU` 的方式，可以更好地利用硬件特性和性能优势       
3. `WebAssembly`：是一种用于在Web浏览器中运行`C、C++`等编写的`web3D`应用

* `WebGL`框架实践：[Threejs官网](https://threejs.org/)，本章主要介绍`WebGL`的主流框架`Threejs`
* `WebGPU`框架实践：[orillusion官网](https://www.orillusion.com/)
* `WebAssembly`框架实践：`C4D`、`Blender`、`Unity`等3D开发软件

::: tip
#### `WebGPU` 和 `WebGL` 的对比
> 性能：`WebGPU` 可以更好地利用硬件加速，因此可以提供更高的图形性能，特别是在处理大量数据时。相比之下，`WebGL` 的性能较低       
> 功能：`WebGPU` 提供了更多的功能和灵活性，例如支持计算着色器，反走样等高级渲染技术。而 `WebGL` 的功能相对较少，并且受到旧的 `OpenGL ES` 标准的限制     
> 设计：`WebGPU` 基于现代图形API设计，更具可扩展性和可维护性，而 `WebGL` 则是基于较早的 OpenGL ES 标准设计的        
总体来说，`WebGPU` 更适合需要高性能和先进渲染技术的场景，而 `WebGL` 则更适合一些简单的2D或3D渲染需求        

#### `WebGPU` 和 `WebAssembly` 的对比
1. `WebGPU` 是一种用于Web浏览器中进行高性能图形渲染的新API，而 `WebAssembly` 是一种用于在Web浏览器中运行高性能计算密集型应用程序的字节码格式        
2. `WebGPU` 旨在提供比现有Web图形API更好的性能和效率，而 `WebAssembly` 旨在提供比 `JavaScript` 更快的执行速度以及更好的可移植性和安全性      
3. `WebGPU` 需要硬件支持，并且只能在支持 `WebGPU` 的浏览器中使用，而 `WebAssembly` 可以在任何支持它的览器中使用         
4. 尽管 `WebGPU` 和 `WebAssembly` 都提供了一些新的功能和优势，但它们并不相互排斥，实际上，它们可以一起使用来实现更高效和灵活的 Web`应用程序。
:::

### 11.1.1 安装与使用

```zsh
pnpm create vite
pnpm install
pnpm install three@ --save
```

```vue
<script setup lang="ts" name="demo">
// 引入three.js
import * as THREE from "three";
import { nextTick} from "vue";

// 创建3D场景对象Scene
const scene = new THREE.Scene();

// 根据需要设置相机位置具体值
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// 创建渲染器对象
const renderer = new THREE.WebGLRenderer();

// 设置Canvas画布尺寸
renderer.setSize( 400, 400 );

// 创建一个几何体
const geometry = new THREE.BoxGeometry( 1, 1, 1 );

// 创建一个材质对象Material
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

// 根据几何体和材料对象创建一个物体
const cube = new THREE.Mesh( geometry, material );

// 将物体放入场景
scene.add( cube );
// 设置相机 z 轴位置
camera.position.z = 5;

function animate() {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    // 渲染器开始渲染
    renderer.render( scene, camera );
}

nextTick(()=>{
    // 将场景挂载到指定 DOM 元素上
    const dom =  document.querySelector("#scene") as HTMLCanvasElement;
    dom.appendChild( renderer.domElement );
    // 创建动画，并渲染
    animate();
});

</script>

<template>
  <div id="scene" />
</template>
```

### 11.1.2 基本构成
由场景 `Scene`、相机 `Camera`、网格 `Mesh`、渲染器 `Renderer`等基本抽象组件构成

#### 场景 `Scene` 
构建一个三维场景

* 初始化
```js
const scene = new THREE.Scene();
const backgroundcolor = new THREE.Color( 0xff0000 );
scene.background = backgroundcolor;
scene.add( line );
```


* 方法
1. `add()`
> 把网格 `mesh` 添加到三维场景 `scene` 中       

* 属性

1. `background`

* 可选值
> `null`:默认
> `Color`:颜色
> `Texture`:纹理

#### 相机 `Camera`  
构建一个在三维场景种的视角

```js
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );
```

* 方法
1. `.position.set(x : number, y : number, z : number)`
> 定义相机在三维场景 `Scene` 中的位置

1. `.lookAt(x : number, y : number, z : number)`
> 定义相机观察的目标位置
>> `camera.lookAt(mesh.position);`观察网格位置
#### 网格 `Mesh`
材质 `Material` + 几何体 `Geometry`就是一个网格 `Mesh`


```js
const mesh = new THREE.Mesh(geometry, material);
```

* 方法
1. `.position.set(x : number, y : number, z : number)`
> 定义网格在三维场景 `Scene` 中的位置

#### 渲染器 `Renderer`
构建渲染场景及网格

```js
const renderer = new THREE.WebGLRenderer();
renderer.setSize( 400, 400 );
renderer.render( scene, camera );
document.body.appendChild( renderer.domElement );
```


* 方法
1. `setSize(width : number, height : number)`
> 设置画布尺寸    

1. `render(scene : object, camera : object)`
> 渲染器渲染    

* 属性
1. `domElement`
> 画布的 `DOM` 实例


## 11.2 几何体 `Geometry`
`Threejs` 提供了一下的几何体 `API`，用来表示二、三维物体的几何形状
### 11.2.1 平面类型

1. 平面 `PlaneGeometry`
* 参数      
`PlaneGeometry(width : Float, height : Float, widthSegments : Integer, heightSegments : Integer)`
> `width`:平面沿着X轴的宽度（默认 1）       
> `height`:平面沿着Y轴的高度（默认 1）       
> `widthSegments`:平面的宽度分段数（可选,默认 0）       
> `heightSegments`:平面的高度分段数（可选,默认 0）      

* 案例
```js
const geometry = new THREE.PlaneGeometry( 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, material );
scene.add( plane );
```
<iframe style="width:100%;height:400px;" src="https://threejs.org/docs/scenes/geometry-browser.html#PlaneGeometry"></iframe>


2. 圆形 `CircleGeometry`
* 参数      
`CircleGeometry(radius : Float, segments : Integer, thetaStart : Float, thetaLength : Float)`
> `radius`:圆形的半径（默认 1）       
> `segments`:分段（三角面）的数量（默认 32，最小值 3）      
> `thetaStart`:第一个分段的起始角度（默认 0）       
> `thetaLength`:圆形扇区的中心角“θ”（默认 2*Pi）           

* 案例
```js
const geometry = new THREE.CircleGeometry( 5, 32 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const circle = new THREE.Mesh( geometry, material );
scene.add( circle );
```
<iframe style="width:100%;height:400px;" src="https://threejs.org/docs/scenes/geometry-browser.html#CircleGeometry"></iframe>

3. 圆环形 `RingGeometry`

* 参数      
`RingGeometry(innerRadius : Float, outerRadius : Float, thetaSegments : Integer, phiSegments : Integer, thetaStart : Float, thetaLength : Float)`
> `innerRadius`:内部半径（默认 0.5 ）       
> `outerRadius`:外部半径（默认 1 ）       
> `thetaSegments`:圆环的分段数（最小值 3，默认 32 ）       
> `phiSegments`:圆环直径方向的分段数（最小值 1，默认值 8 ）    
> `thetaStart`:起始角度（默认 0）       
> `thetaLength`:圆环形的中心角“θ”（默认 2*Pi）  

* 案例
```js
const geometry = new THREE.RingGeometry( 1, 5, 32 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
```

<iframe style="width:100%;height:400px;" src="https://threejs.org/docs/scenes/geometry-browser.html#RingGeometry"></iframe>

4. 多边形 `ShapeGeometry`
* 参数      
`ShapeGeometry(shapes : Array, curveSegments : Integer)`
> `shapes`:一个单独的`shape`，或者一个包含形状的`Array`（默认 `shape` ）       
> `curveSegments`:每一个形状的分段数（默认 12 ）       

* 案例
```js
const x = 0, y = 0;

const heartShape = new THREE.Shape();

heartShape.moveTo( x + 5, y + 5 );
heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

const geometry = new THREE.ShapeGeometry( heartShape );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const mesh = new THREE.Mesh( geometry, material ) ;
scene.add( mesh );
```
<iframe style="width:100%;height:400px;" src="https://threejs.org/docs/scenes/geometry-browser.html#ShapeGeometry"></iframe>

### 11.2.2 多面立体类型

1. 立方体 `BoxGeometry`
* 参数      
`BoxGeometry(width : Float, height : Float, depth : Float, widthSegments : Integer, heightSegments : Integer, depthSegments : Integer)`
> `width`:X轴上面的宽度（默认 1）       
> `height`:Y轴上面的高度（默认 1）      
> `depth`:Z轴上面的深度（默认 1）       
> `widthSegments`:宽度的分段数（可选,默认 1）       
> `heightSegments`:高度的分段数（可选,默认 1）      
> `depthSegments`:深度的分段数（可选,默认 1）       

* 案例
```js
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
```
<iframe style="width:100%;height:400px;" src="https://threejs.org/docs/scenes/geometry-browser.html#BoxGeometry"></iframe>


 2. 四面体 `TetrahedronGeometry`
* 参数      
`TetrahedronGeometry(radius : Float, detail : Integer)`
> `radius`:十二面体的半径（默认 1）       
> `detail`:顶点数（默认 0 ）  

<iframe style="width:100%;height:400px;" src="https://threejs.org/docs/scenes/geometry-browser.html#TetrahedronGeometry"></iframe>

3. 八面体 `OctahedronGeometry`
* 参数      
`OctahedronGeometry(radius : Float, detail : Integer)`
> `radius`:八面体的半径（默认 1）       
> `detail`:顶点数（默认 0 ）    

<iframe style="width:100%;height:400px;" src="https://threejs.org/docs/scenes/geometry-browser.html#OctahedronGeometry"></iframe>

4. 十二面体 `DodecahedronGeometry`
* 参数      
`DodecahedronGeometry(radius : Float, detail : Integer)`
> `radius`:十二面体的半径（默认 1）       
> `detail`:顶点数（默认 0 ）     

<iframe style="width:100%;height:400px;" src="https://threejs.org/docs/scenes/geometry-browser.html#DodecahedronGeometry"></iframe>

5. 二十面体 `IcosahedronGeometry`
* 参数      
`IcosahedronGeometry(radius : Float, detail : Integer)`
> `radius`:十二面体的半径（默认 1）       
> `detail`:顶点数（默认 0 ）    

<iframe style="width:100%;height:400px;" src="https://threejs.org/docs/scenes/geometry-browser.html#IcosahedronGeometry"></iframe>

6. 多面体 `PolyhedronGeometry`
* 参数      
`PolyhedronGeometry(vertices : Array, indices : Array, radius : Float, detail : Integer)`
> `vertices`:顶点的集合（默认 [1,1,1, -1,-1,-1, ... ] ）        
> `indices`:构成面的索引（默认 [0,1,2, 2,3,0, ... ] ）      
> `radius`:最终形状的半径       
> `detail`:将对这个几何体细分多少个级别。细节越多，形状就越平滑     

* 案例
```js
const verticesOfCube = [
    -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
    -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
];

const indicesOfFaces = [
    2,1,0,    0,3,2,
    0,4,7,    7,3,0,
    0,1,5,    5,4,0,
    1,2,6,    6,5,1,
    2,3,7,    7,6,2,
    4,5,6,    6,7,4
];

const geometry = new THREE.PolyhedronGeometry( verticesOfCube, indicesOfFaces, 6, 2 );
```

<iframe style="width:100%;height:400px;" src="https://threejs.org/docs/scenes/geometry-browser.html#PolyhedronGeometry"></iframe>

7. 车削体 `IcosahedronGeometry`
* 参数      
`LatheGeometry(points : Array, segments : Integer, phiStart : Float, phiLength : Float)`
> `points`:点集合（`THREE.Curve`对象，默认 (0,-0.5), (0.5,0), (0,0.5)  ）    
> `segments`:要生成的车削几何体圆周分段的数量（默认 12 ）    
> `phiStart`:起始角度（默认 0 ）    
> `phiLength`:车削部分的弧度（0-2*Pi 默认 2*Pi ）    

* 案例
```js
const points = [];
for ( let i = 0; i < 10; i ++ ) {
	points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
}
const geometry = new THREE.LatheGeometry( points );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const lathe = new THREE.Mesh( geometry, material );
scene.add( lathe );
```

<iframe style="width:100%;height:400px;" src="https://threejs.org/docs/scenes/geometry-browser.html#IcosahedronGeometry"></iframe>


### 11.2.3 曲面立体类型

1. 胶囊体 `CapsuleGeometry`

<iframe style="width:100%;height:400px;" src="https://threejs.org/docs/scenes/geometry-browser.html#CapsuleGeometry"></iframe>

* 参数      
`CapsuleGeometry(radius : Float, length : Float, capSubdivisions : Integer, radialSegments : Integer)`
> `radius`:胶囊的半径（可选,默认 1）       
> `length`:胶囊的长度（可选,默认 1）      
> `capSubdivisions`:构造盖子的曲线部分的个数（可选,默认 4）       
> `radialSegments`:覆盖胶囊圆周的分离的面的个数（可选,默认 8）           

* 案例
```js
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
```

1. 圆柱体 `CylinderGeometry`

<iframe style="width:100%;height:400px;" src="https://threejs.org/docs/scenes/geometry-browser.html#CylinderGeometry"></iframe>

* 参数      
`CylinderGeometry(radiusTop : Float, radiusBottom : Float, height : Float, radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)`
> `radiusTop`:圆柱的顶部半径（默认 1）       
> `radiusBottom`:圆柱的底部半径（默认 1）       
> `height`:圆柱的高度（默认 1）       
> `radialSegments`:圆柱侧面周围的分段数（默认 32）     
> `heightSegments`:圆柱侧面沿着其高度的分段数（默认 1）       
> `openEnded`:圆锥的顶和底面是开放的还是封顶的（默认 false）     
> `thetaStart`:第一个分段的起始角度（默认 0）       
> `thetaLength`:圆柱底面圆扇区的中心角“θ”（默认 2*Pi）     


* 案例
```js
const geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const cylinder = new THREE.Mesh( geometry, material );
scene.add( cylinder );
```

3. 圆锥体 `ConeGeometry`

<iframe style="width:100%;height:400px;" src="https://threejs.org/docs/scenes/geometry-browser.html#ConeGeometry"></iframe>

* 参数      
`ConeGeometry(radius : Float, height : Float, radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)`
> `radius`:圆锥底部的半径（默认 1）       
> `height`:圆锥的高度（默认 1）       
> `radialSegments`:圆锥侧面周围的分段数（默认 32）     
> `heightSegments`:圆锥侧面沿着其高度的分段数（默认 1）     
> `openEnded`:圆锥的底面是开放的还是封顶的（默认 false）       
> `thetaStart`:第一个分段的起始角度（默认 0）       
> `thetaLength`:圆锥底面圆扇区的中心角“θ”（默认 2*Pi）      

* 案例
```js
const geometry = new THREE.ConeGeometry( 5, 20, 32 );
const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const cone = new THREE.Mesh( geometry, material );
scene.add( cone );
```

1. 球体 `SphereGeometry`

<iframe style="width:100%;height:400px;" src="https://threejs.org/docs/scenes/geometry-browser.html#SphereGeometry"></iframe>

* 参数      
`SphereGeometry(radius : Float, widthSegments : Integer, heightSegments : Integer, phiStart : Float, phiLength : Float, thetaStart : Float, thetaLength : Float)`
> `radius`:球体半径（默认 1）       
> `widthSegments`:水平分段数（经线）（最小值 3，默认值 32 ）       
> `heightSegments`:垂直分段数（纬线）（最小值 2，默认值 16 ）       
> `phiStart`:水平（经线）起始角度（默认 0 ）      
> `phiLength`:水平（经线）角度（默认 2*Pi）      
> `thetaStart`:垂直（纬线）起始角度（默认 0 ）      
> `thetaLength`:垂直（纬线）角度（默认 Pi）      

* 案例
```js
const geometry = new THREE.SphereGeometry( 15, 32, 16 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );
```

1. 圆环体 `TorusGeometry`

<iframe style="width:100%;height:400px;" src="https://threejs.org/docs/scenes/geometry-browser.html#TorusGeometry"></iframe>

* 参数      
`TorusGeometry(radius : Float, tube : Float, radialSegments : Integer, tubularSegments : Integer, arc : Float)`
> `radius`:圆环半径（从环面的中心到管道横截面的中心）（默认 1）       
> `tube`:管道半径（默认值 0.4 ）       
> `radialSegments`:管道横截面的分段数（默认值 12 ）       
> `tubularSegments`:管道的分段数（默认 48 ）      
> `arc`:圆心角（默认 2*Pi）        

* 案例
```js
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const torus = new THREE.Mesh( geometry, material );
scene.add( torus );
```

1. 管道体 `TubeGeometry`

<iframe style="width:100%;height:400px;" src="https://threejs.org/docs/scenes/geometry-browser.html#TubeGeometry"></iframe>

* 参数      
`TubeGeometry(path : Curve, tubularSegments : Integer, radius : Float, radialSegments : Integer, closed : Boolean)`
> `path`:由基类Curve继承而来的3D路径（默认 curve ）   
> `tubularSegments`:管道的分段数（默认 64）   
> `radius`:管道的半径（默认 1）          
> `radialSegments`:管道横截面的分段数（默认值 8 ）       
> `closed`:管道的两端是否闭合（默认 false ）      

* 案例
```js
class CustomSinCurve extends THREE.Curve {
	constructor( scale = 1 ) {
		super();
		this.scale = scale;
	}

	getPoint( t, optionalTarget = new THREE.Vector3() ) {
		const tx = t * 3 - 1.5;
		const ty = Math.sin( 2 * Math.PI * t );
		const tz = 0;
		return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
	}
}

const path = new CustomSinCurve( 10 );
const geometry = new THREE.TubeGeometry( path, 20, 2, 8, false );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
```

1. 圆环扭结体 `TorusKnotGeometry`

<iframe style="width:100%;height:400px;" src="https://threejs.org/docs/scenes/geometry-browser.html#TorusKnotGeometry"></iframe>

* 参数      
`TorusKnotGeometry(radius : Float, tube : Float, tubularSegments : Integer, radialSegments : Integer, p : Integer, q : Integer)`
> `radius`:圆环半径（从环面的中心到管道横截面的中心）（默认 1）       
> `tube`:管道半径（默认值 0.4 ）       
> `radialSegments`:管道横截面的分段数（默认值 8 ）       
> `tubularSegments`:管道的分段数（默认 64 ）      
> `p`:几何体将绕着其旋转对称轴旋转次数（默认 2）        
> `q`:几何体将绕着其内部圆环旋转次数（默认 3）      

* 案例
```js
const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const torusKnot = new THREE.Mesh( geometry, material );
scene.add( torusKnot );
```

### 11.2.4 修饰类型

1. 边缘体 `EdgesGeometry`

* 参数      
`EdgesGeometry( geometry : BufferGeometry, thresholdAngle : Integer )`
> `geometry`:任何一个几何体对象       
> `thresholdAngle`:仅当相邻面的法线之间的角度（单位为角度）超过这个值时，才会渲染边缘（默认 1 ）      

<a href="https://threejs.org/examples/#webgl_helpers">预览案例</a>

2. 挤压体 `ExtrudeGeometry`

<iframe style="width:100%;height:400px;" src="https://threejs.org/docs/scenes/geometry-browser.html#ExtrudeGeometry"></iframe>

* 参数      
`ExtrudeGeometry(shapes : Array, options : Object)`
> `shapes`:形状或者一个包含形状的数组       
> `options`:包含有下列参数的对象        
>> `curveSegment`:曲线上点的数量（`int`默认 12 ）       
>> `steps`:用于沿着挤出样条的深度细分的点的数量（`int`默认 1 ）     
>> `depth`:挤出的形状的深度（`float`默认 1 ）       
>> `bevelEnabled`:对挤出的形状应用是否斜角（`bool`默认 true ）      
>> `bevelThickness`:设置原始形状上斜角的厚度（`float`默认 0.2 ） 
>> `bevelSize`:斜角与原始形状轮廓之间的延伸距离（`float`默认 0.1 ） 
>> `bevelOffset`:斜角与原始形状轮廓之间的偏移量（`float`默认 0 ）       
>> `bevelSegments`:斜角的分段层数（`int`默认 3 ）       
>> `extrudePath`:一条沿着被挤出形状的三维样条线。不支持路径挤压的斜面（`THREE.Curve`对象）     
>> `UVGenerator`:提供了UV生成器函数的对象（`Object`默认 3 ）     

3. 网格体 `WireframeGeometry`

* 参数      
`WireframeGeometry( geometry : BufferGeometry )`
> `geometry`:任意几何体对象      

* 案例
```js
const geometry = new THREE.SphereGeometry( 100, 100, 100 );
const wireframe = new THREE.WireframeGeometry( geometry );
const line = new THREE.LineSegments( wireframe );

line.material.depthTest = false;
line.material.opacity = 0.25;
line.material.transparent = true;

scene.add( line );
```

<a href="https://threejs.org/examples/#webgl_helpers">预览案例</a>

## 11.3 材质 `Material`
构建几何体的材质（颜色、纹理）      
### 11.3.1 通用材质属性：

* `alphaHash`:启用alphaHash透明度，这是`transparent`或`alphaTest`的替代方案。如果不透明度低于随机阈值，则不会渲染材质。随机化会引入一些颗粒或噪点，但相较于传统的Alpha blend方式，避免了透明度引起的深度排序问题。使用TAARenderPass可以有效减少噪点（`Boolean`）

* `alphaTest`:设置运行alphaTest时要使用的alpha值。如果不透明度低于此值，则不会渲染材质（`Float`默认 0）

* `alphaToCoverage`:启用alpha to coverage. 只能在开启了MSAA的渲染环境中使用 (当渲染器创建的时候antialias 属性要true才能使用)（`Boolean`）

* `blendDst`:混合目标。默认值为OneMinusSrcAlphaFactor。 目标因子所有可能的取值请参阅constants。 必须将材质的blending设置为CustomBlending才能生效（`int`）

* `blendDstAlpha`:.blendDst的透明度（`int` 默认 null）

* `blendEquation`:使用混合时所采用的混合方程式。默认值为AddEquation。 混合方程式所有可能的取值请参阅constants。 必须将材质的blending设置为CustomBlending才能生效（`int`）

* `blendEquationAlpha`:`blendEquation`的透明度（`int` 默认 null）

* `blending`:Blending在使用此材质显示对象时要使用何种混合。必须将其设置为CustomBlending才能使用自定义blendSrc, blendDst 或者 [page:Constant blendEquation]。 混合模式所有可能的取值请参阅`constants`（`String`默认 NormalBlending）

* `blendSrc`:混合源。默认值为SrcAlphaFactor。 源因子所有可能的取值请参阅constants。必须将材质的blending设置为CustomBlending才能生效（`int` 默认 null）

* `blendSrcAlpha`:`blendSrc`的透明度（`int` 默认 null）

* `clipIntersection`:更改剪裁平面的行为，以便仅剪切其交叉点，而不是它们的并集（`Boolean`默认 false）

* `clippingPlanes`:用户定义的剪裁平面，在世界空间中指定为THREE.Plane对象。这些平面适用于所有使用此材质的对象。空间中与平面的有符号距离为负的点被剪裁（未渲染）。 这需要WebGLRenderer.localClippingEnabled为true。 示例请参阅WebGL / clipping /intersection（`Array`默认 null）

* `clipShadows`:定义是否根据此材质上指定的剪裁平面剪切阴影（`Boolean`默认 false）

* `colorWrite`:是否渲染材质的颜色。 这可以与网格的renderOrder属性结合使用，以创建遮挡其他对象的不可见对象（`Boolean`默认 true）

* `defines`:注入shader的自定义对象。 以键值对形式的对象传递，{ MY_CUSTOM_DEFINE: '' , PI2: Math.PI * 2 }。 这些键值对在顶点和片元着色器中定义（`Array`默认 undefined）

* `depthFunc`:使用何种深度函数。默认为LessEqualDepth。 深度模式所有可能的取值请查阅constants。（`int`）

* `depthTest`:是否在渲染此材质时启用深度测试（`Boolean`默认 true）

* `depthWrite`:渲染此材质是否对深度缓冲区有任何影响。在绘制2D叠加时，将多个事物分层在一起而不创建z-index时，禁用深度写入会很有用（`Boolean`默认 true）

* `forceSinglePass`:决定双面透明的东西是否强制使用单通道渲染。
为了减少一些半透明物体的渲染错误，此引擎调用两次绘制来渲染渲染双面透明的东西。 但是此方案可能会导致在某些情况下使绘制调用次数翻倍，例如渲染一些平面的植物例如草精灵之类的。 在这些情况下，将forceSinglePass设置为true来使用单通道渲染来避免性能问题（`Boolean`默认 false）

* `isMaterial`:检查这个对象是否为材质Material的只读标记（`Boolean`）

* `stencilWrite`:是否对模板缓冲执行模板操作，如果执行写入或者与模板缓冲进行比较，这个值需要设置为true（`Boolean`默认 false）

* `stencilWriteMask`:写入模板缓冲区时所用的位元遮罩（`int` 默认 0xFF）

* `stencilFunc`:使用模板比较时所用的方法，默认为AlwaysStencilFunc。在模板函数 constants 中查看可用的值（`int`）

* `stencilRef`:在进行模板比较或者模板操作的时候所用的基准值（`int`默认 0）

* `stencilFuncMask`:与模板缓冲进行比较时所使用的位元遮罩（`int` 默认 0xFF）

* `stencilFail`:当比较函数没有通过的时候要执行的模板操作，默认为KeepStencilOp，在模板操作 constants 查看可用值。（`int`）

* `stencilZFail`:当比较函数通过了但是深度检测没有通过的时候要执行的模板操作， 默认为KeepStencilOp，在模板操作 constants 查看可用值（`int`）

* `stencilZPass`:当比较函数和深度检测都通过时要执行的模板操作，默认为KeepStencilOp，在模板操作constants 中查看可用值（`int`）

* `id`:此材质实例的唯一编号（`int`）

* `name`:对象的可选名称（不必是唯一的）（`String`默认空）

* `needsUpdate`:指定需要重新编译材质（`Boolean`默认）

* `opacity`:在0.0 - 1.0的范围内的浮点数，表明材质的透明度。值0.0表示完全透明，1.0表示完全不透明。
如果材质的`transparent`属性未设置为true，则材质将保持完全不透明，此值仅影响其颜色（`Float`默认 1.0）

* `polygonOffset`:是否使用多边形偏移。这对应于WebGL的GL_POLYGON_OFFSET_FILL功能（`Boolean`默认 false）

* `polygonOffsetFactor`:设置多边形偏移系数（`int`默认 0）     

* `polygonOffsetUnits`:设置多边形偏移单位（`int`默认 0）

* `precision`:重写此材质渲染器的默认精度。可以是highp, mediump或lowp（`String`默认 null）

* `premultipliedAlpha`:是否预乘alpha（透明度）值。有关差异的示例，请参阅WebGL / Materials / Physical / Transmission（`Boolean`默认 false）

* `dithering`:是否对颜色应用抖动以消除条带的外观（`Boolean`默认 false）

* `shadowSide`:定义投影的面（`int`默认 null）