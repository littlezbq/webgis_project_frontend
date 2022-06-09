define(["./Transforms-f15de320","./Matrix2-c6c16658","./RuntimeError-5b082e8f","./when-4bbc8319","./ComponentDatatype-3d0a0aac","./ArcType-fc72c06c","./arrayRemoveDuplicates-80a91d16","./EllipsoidGeodesic-2e7ba57d","./EllipsoidRhumbLine-c6741351","./EncodedCartesian3-b1495e46","./GeometryAttribute-8350368e","./IntersectionTests-a4e54d9a","./Plane-26e67b94","./WebMercatorProjection-baa60d8a","./combine-e9466e32","./WebGLConstants-508b9636"],(function(e,t,a,n,i,r,s,o,l,c,u,C,p,d,h,g){"use strict";function f(a){a=n.defaultValue(a,n.defaultValue.EMPTY_OBJECT),this._ellipsoid=n.defaultValue(a.ellipsoid,t.Ellipsoid.WGS84),this._rectangle=n.defaultValue(a.rectangle,t.Rectangle.MAX_VALUE),this._projection=new e.GeographicProjection(this._ellipsoid),this._numberOfLevelZeroTilesX=n.defaultValue(a.numberOfLevelZeroTilesX,2),this._numberOfLevelZeroTilesY=n.defaultValue(a.numberOfLevelZeroTilesY,1)}Object.defineProperties(f.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},rectangle:{get:function(){return this._rectangle}},projection:{get:function(){return this._projection}}}),f.prototype.getNumberOfXTilesAtLevel=function(e){return this._numberOfLevelZeroTilesX<<e},f.prototype.getNumberOfYTilesAtLevel=function(e){return this._numberOfLevelZeroTilesY<<e},f.prototype.rectangleToNativeRectangle=function(e,a){const r=i.CesiumMath.toDegrees(e.west),s=i.CesiumMath.toDegrees(e.south),o=i.CesiumMath.toDegrees(e.east),l=i.CesiumMath.toDegrees(e.north);return n.defined(a)?(a.west=r,a.south=s,a.east=o,a.north=l,a):new t.Rectangle(r,s,o,l)},f.prototype.tileXYToNativeRectangle=function(e,t,a,n){const r=this.tileXYToRectangle(e,t,a,n);return r.west=i.CesiumMath.toDegrees(r.west),r.south=i.CesiumMath.toDegrees(r.south),r.east=i.CesiumMath.toDegrees(r.east),r.north=i.CesiumMath.toDegrees(r.north),r},f.prototype.tileXYToRectangle=function(e,a,i,r){const s=this._rectangle,o=this.getNumberOfXTilesAtLevel(i),l=this.getNumberOfYTilesAtLevel(i),c=s.width/o,u=e*c+s.west,C=(e+1)*c+s.west,p=s.height/l,d=s.north-a*p,h=s.north-(a+1)*p;return n.defined(r)||(r=new t.Rectangle(u,h,C,d)),r.west=u,r.south=h,r.east=C,r.north=d,r},f.prototype.positionToTileXY=function(e,a,r){const s=this._rectangle;if(!t.Rectangle.contains(s,e))return;const o=this.getNumberOfXTilesAtLevel(a),l=this.getNumberOfYTilesAtLevel(a),c=s.width/o,u=s.height/l;let C=e.longitude;s.east<s.west&&(C+=i.CesiumMath.TWO_PI);let p=(C-s.west)/c|0;p>=o&&(p=o-1);let d=(s.north-e.latitude)/u|0;return d>=l&&(d=l-1),n.defined(r)?(r.x=p,r.y=d,r):new t.Cartesian2(p,d)};const m=new t.Cartesian3,w=new t.Cartesian3,y=new t.Cartographic,M=new t.Cartesian3,T=new t.Cartesian3,E=new e.BoundingSphere,_=new f,O=[new t.Cartographic,new t.Cartographic,new t.Cartographic,new t.Cartographic],b=new t.Cartesian2,P={};function A(e){t.Cartographic.fromRadians(e.east,e.north,0,O[0]),t.Cartographic.fromRadians(e.west,e.north,0,O[1]),t.Cartographic.fromRadians(e.east,e.south,0,O[2]),t.Cartographic.fromRadians(e.west,e.south,0,O[3]);let a=0,n=0,i=0,r=0;const s=P._terrainHeightsMaxLevel;let o;for(o=0;o<=s;++o){let e=!1;for(let t=0;t<4;++t){const a=O[t];if(_.positionToTileXY(a,o,b),0===t)i=b.x,r=b.y;else if(i!==b.x||r!==b.y){e=!0;break}}if(e)break;a=i,n=r}if(0!==o)return{x:a,y:n,level:o>s?s:o-1}}P.initialize=function(){let t=P._initPromise;return n.defined(t)||(t=e.Resource.fetchJson(e.buildModuleUrl("Assets/approximateTerrainHeights.json")).then((function(e){P._terrainHeights=e})),P._initPromise=t),t},P.getMinimumMaximumHeights=function(e,a){a=n.defaultValue(a,t.Ellipsoid.WGS84);const i=A(e);let r=P._defaultMinTerrainHeight,s=P._defaultMaxTerrainHeight;if(n.defined(i)){const o=`${i.level}-${i.x}-${i.y}`,l=P._terrainHeights[o];n.defined(l)&&(r=l[0],s=l[1]),a.cartographicToCartesian(t.Rectangle.northeast(e,y),m),a.cartographicToCartesian(t.Rectangle.southwest(e,y),w),t.Cartesian3.midpoint(w,m,M);const c=a.scaleToGeodeticSurface(M,T);if(n.defined(c)){const e=t.Cartesian3.distance(M,c);r=Math.min(r,-e)}else r=P._defaultMinTerrainHeight}return r=Math.max(P._defaultMinTerrainHeight,r),{minimumTerrainHeight:r,maximumTerrainHeight:s}},P.getBoundingSphere=function(a,i){i=n.defaultValue(i,t.Ellipsoid.WGS84);const r=A(a);let s=P._defaultMaxTerrainHeight;if(n.defined(r)){const e=`${r.level}-${r.x}-${r.y}`,t=P._terrainHeights[e];n.defined(t)&&(s=t[1])}const o=e.BoundingSphere.fromRectangle3D(a,i,0);return e.BoundingSphere.fromRectangle3D(a,i,s,E),e.BoundingSphere.union(o,E,o)},P._terrainHeightsMaxLevel=6,P._defaultMaxTerrainHeight=9e3,P._defaultMinTerrainHeight=-1e5,P._terrainHeights=void 0,P._initPromise=void 0,Object.defineProperties(P,{initialized:{get:function(){return n.defined(P._terrainHeights)}}});const k=[e.GeographicProjection,d.WebMercatorProjection],L=k.length,S=Math.cos(i.CesiumMath.toRadians(30)),x=Math.cos(i.CesiumMath.toRadians(150));function I(e){const a=(e=n.defaultValue(e,n.defaultValue.EMPTY_OBJECT)).positions;this.width=n.defaultValue(e.width,1),this._positions=a,this.granularity=n.defaultValue(e.granularity,9999),this.loop=n.defaultValue(e.loop,!1),this.arcType=n.defaultValue(e.arcType,r.ArcType.GEODESIC),this._ellipsoid=t.Ellipsoid.WGS84,this._projectionIndex=0,this._workerName="createGroundPolylineGeometry",this._scene3DOnly=!1}Object.defineProperties(I.prototype,{packedLength:{get:function(){return 1+3*this._positions.length+1+1+1+t.Ellipsoid.packedLength+1+1}}}),I.setProjectionAndEllipsoid=function(e,t){let a=0;for(let n=0;n<L;n++)if(t instanceof k[n]){a=n;break}e._projectionIndex=a,e._ellipsoid=t.ellipsoid};const N=new t.Cartesian3,R=new t.Cartesian3,D=new t.Cartesian3;function v(e,a,n,i,r){const s=Y(i,e,0,N),o=Y(i,e,n,R),l=Y(i,a,0,D),c=F(o,s,R),u=F(l,s,D);return t.Cartesian3.cross(u,c,r),t.Cartesian3.normalize(r,r)}const z=new t.Cartographic,H=new t.Cartesian3,B=new t.Cartesian3,j=new t.Cartesian3;function G(e,a,n,i,s,c,u,C,p,d,h){if(0===s)return;let g;c===r.ArcType.GEODESIC?g=new o.EllipsoidGeodesic(e,a,u):c===r.ArcType.RHUMB&&(g=new l.EllipsoidRhumbLine(e,a,u));const f=g.surfaceDistance;if(f<s)return;const m=v(e,a,i,u,j),w=Math.ceil(f/s),y=f/w;let M=y;const T=w-1;let E=C.length;for(let r=0;r<T;r++){const e=g.interpolateUsingSurfaceDistance(M,z),a=Y(u,e,n,H),r=Y(u,e,i,B);t.Cartesian3.pack(m,C,E),t.Cartesian3.pack(a,p,E),t.Cartesian3.pack(r,d,E),h.push(e.latitude),h.push(e.longitude),E+=3,M+=y}}const V=new t.Cartographic;function Y(e,a,n,i){return t.Cartographic.clone(a,V),V.height=n,t.Cartographic.toCartesian(V,e,i)}function F(e,a,n){return t.Cartesian3.subtract(e,a,n),t.Cartesian3.normalize(n,n),n}function q(e,a,n,i){return i=F(e,a,i),i=t.Cartesian3.cross(i,n,i),i=t.Cartesian3.normalize(i,i),t.Cartesian3.cross(n,i,i)}I.pack=function(e,a,i){let r=n.defaultValue(i,0);const s=e._positions,o=s.length;a[r++]=o;for(let n=0;n<o;++n){const e=s[n];t.Cartesian3.pack(e,a,r),r+=3}return a[r++]=e.granularity,a[r++]=e.loop?1:0,a[r++]=e.arcType,t.Ellipsoid.pack(e._ellipsoid,a,r),r+=t.Ellipsoid.packedLength,a[r++]=e._projectionIndex,a[r++]=e._scene3DOnly?1:0,a},I.unpack=function(e,a,i){let r=n.defaultValue(a,0);const s=e[r++],o=new Array(s);for(let n=0;n<s;n++)o[n]=t.Cartesian3.unpack(e,r),r+=3;const l=e[r++],c=1===e[r++],u=e[r++],C=t.Ellipsoid.unpack(e,r);r+=t.Ellipsoid.packedLength;const p=e[r++],d=1===e[r++];return n.defined(i)||(i=new I({positions:o})),i._positions=o,i.granularity=l,i.loop=c,i.arcType=u,i._ellipsoid=C,i._projectionIndex=p,i._scene3DOnly=d,i};const X=new t.Cartesian3,W=new t.Cartesian3,U=new t.Cartesian3,Z=new t.Cartesian3;function $(e,a,n,r,s){const o=F(n,a,Z),l=q(e,a,o,X),c=q(r,a,o,W);if(i.CesiumMath.equalsEpsilon(t.Cartesian3.dot(l,c),-1,i.CesiumMath.EPSILON5))return s=t.Cartesian3.cross(o,l,s),t.Cartesian3.normalize(s,s);s=t.Cartesian3.add(c,l,s),s=t.Cartesian3.normalize(s,s);const u=t.Cartesian3.cross(o,s,U);return t.Cartesian3.dot(c,u)<0&&(s=t.Cartesian3.negate(s,s)),s}const J=p.Plane.fromPointNormal(t.Cartesian3.ZERO,t.Cartesian3.UNIT_Y),Q=new t.Cartesian3,K=new t.Cartesian3,ee=new t.Cartesian3,te=new t.Cartesian3,ae=new t.Cartesian3,ne=new t.Cartesian3,ie=new t.Cartographic,re=new t.Cartographic,se=new t.Cartographic;I.createGeometry=function(a){const o=!a._scene3DOnly;let p=a.loop;const d=a._ellipsoid,h=a.granularity,g=a.arcType,f=new k[a._projectionIndex](d),m=1e3;let w,y;const M=a._positions,T=M.length;let E,_,O,b;2===T&&(p=!1);const A=new l.EllipsoidRhumbLine(void 0,void 0,d);let L,x,I;const N=[M[0]];for(y=0;y<T-1;y++)E=M[y],_=M[y+1],L=C.IntersectionTests.lineSegmentPlane(E,_,J,ne),!n.defined(L)||t.Cartesian3.equalsEpsilon(L,E,i.CesiumMath.EPSILON7)||t.Cartesian3.equalsEpsilon(L,_,i.CesiumMath.EPSILON7)||(a.arcType===r.ArcType.GEODESIC?N.push(t.Cartesian3.clone(L)):a.arcType===r.ArcType.RHUMB&&(I=d.cartesianToCartographic(L,ie).longitude,O=d.cartesianToCartographic(E,ie),b=d.cartesianToCartographic(_,re),A.setEndPoints(O,b),x=A.findIntersectionWithLongitude(I,se),L=d.cartographicToCartesian(x,ne),!n.defined(L)||t.Cartesian3.equalsEpsilon(L,E,i.CesiumMath.EPSILON7)||t.Cartesian3.equalsEpsilon(L,_,i.CesiumMath.EPSILON7)||N.push(t.Cartesian3.clone(L)))),N.push(_);p&&(E=M[T-1],_=M[0],L=C.IntersectionTests.lineSegmentPlane(E,_,J,ne),!n.defined(L)||t.Cartesian3.equalsEpsilon(L,E,i.CesiumMath.EPSILON7)||t.Cartesian3.equalsEpsilon(L,_,i.CesiumMath.EPSILON7)||(a.arcType===r.ArcType.GEODESIC?N.push(t.Cartesian3.clone(L)):a.arcType===r.ArcType.RHUMB&&(I=d.cartesianToCartographic(L,ie).longitude,O=d.cartesianToCartographic(E,ie),b=d.cartesianToCartographic(_,re),A.setEndPoints(O,b),x=A.findIntersectionWithLongitude(I,se),L=d.cartographicToCartesian(x,ne),!n.defined(L)||t.Cartesian3.equalsEpsilon(L,E,i.CesiumMath.EPSILON7)||t.Cartesian3.equalsEpsilon(L,_,i.CesiumMath.EPSILON7)||N.push(t.Cartesian3.clone(L)))));let R=N.length,D=new Array(R);for(y=0;y<R;y++){const e=t.Cartographic.fromCartesian(N[y],d);e.height=0,D[y]=e}if(D=s.arrayRemoveDuplicates(D,t.Cartographic.equalsEpsilon),R=D.length,R<2)return;const z=[],H=[],B=[],j=[];let V=Q,q=K,X=ee,W=te,U=ae;const Z=D[0],oe=D[1];for(V=Y(d,D[R-1],0,V),W=Y(d,oe,0,W),q=Y(d,Z,0,q),X=Y(d,Z,m,X),U=p?$(V,q,X,W,U):v(Z,oe,m,d,U),t.Cartesian3.pack(U,H,0),t.Cartesian3.pack(q,B,0),t.Cartesian3.pack(X,j,0),z.push(Z.latitude),z.push(Z.longitude),G(Z,oe,0,m,h,g,d,H,B,j,z),y=1;y<R-1;++y){V=t.Cartesian3.clone(q,V),q=t.Cartesian3.clone(W,q);const e=D[y];Y(d,e,m,X),Y(d,D[y+1],0,W),$(V,q,X,W,U),w=H.length,t.Cartesian3.pack(U,H,w),t.Cartesian3.pack(q,B,w),t.Cartesian3.pack(X,j,w),z.push(e.latitude),z.push(e.longitude),G(D[y],D[y+1],0,m,h,g,d,H,B,j,z)}const le=D[R-1],ce=D[R-2];if(q=Y(d,le,0,q),X=Y(d,le,m,X),p){const e=D[0];V=Y(d,ce,0,V),W=Y(d,e,0,W),U=$(V,q,X,W,U)}else U=v(ce,le,m,d,U);if(w=H.length,t.Cartesian3.pack(U,H,w),t.Cartesian3.pack(q,B,w),t.Cartesian3.pack(X,j,w),z.push(le.latitude),z.push(le.longitude),p){for(G(le,Z,0,m,h,g,d,H,B,j,z),w=H.length,y=0;y<3;++y)H[w+y]=H[y],B[w+y]=B[y],j[w+y]=j[y];z.push(Z.latitude),z.push(Z.longitude)}return function(a,n,r,s,o,l,C){let p,d;const h=n._ellipsoid,g=r.length/3-1,f=8*g,m=4*f,w=36*g,y=f>65535?new Uint32Array(w):new Uint16Array(w),M=new Float64Array(3*f),T=new Float32Array(m),E=new Float32Array(m),_=new Float32Array(m),O=new Float32Array(m),b=new Float32Array(m);let A,k,L,x;C&&(A=new Float32Array(m),k=new Float32Array(m),L=new Float32Array(m),x=new Float32Array(2*f));const I=l.length/2;let N=0;const R=Te;R.height=0;const D=Ee;D.height=0;let v=_e,z=Oe;if(C)for(d=0,p=1;p<I;p++)R.latitude=l[d],R.longitude=l[d+1],D.latitude=l[d+2],D.longitude=l[d+3],v=n.project(R,v),z=n.project(D,z),N+=t.Cartesian3.distance(v,z),d+=2;const H=s.length/3;z=t.Cartesian3.unpack(s,0,z);let B,j=0;for(d=3,p=1;p<H;p++)v=t.Cartesian3.clone(z,v),z=t.Cartesian3.unpack(s,d,z),j+=t.Cartesian3.distance(v,z),d+=3;d=3;let G=0,V=0,Y=0,q=0,X=!1,W=t.Cartesian3.unpack(r,0,Pe),U=t.Cartesian3.unpack(s,0,Oe),Z=t.Cartesian3.unpack(o,0,ke);a&&ue(Z,t.Cartesian3.unpack(r,r.length-6,be),W,U)&&(Z=t.Cartesian3.negate(Z,Z));let $=0,J=0,Q=0;for(p=0;p<g;p++){const e=t.Cartesian3.clone(W,be),a=t.Cartesian3.clone(U,_e);let u,p,g,f,m=t.Cartesian3.clone(Z,Ae);if(X&&(m=t.Cartesian3.negate(m,m)),W=t.Cartesian3.unpack(r,d,Pe),U=t.Cartesian3.unpack(s,d,Oe),Z=t.Cartesian3.unpack(o,d,ke),X=ue(Z,e,W,U),R.latitude=l[G],R.longitude=l[G+1],D.latitude=l[G+2],D.longitude=l[G+3],C){const e=Me(R,D);u=n.project(R,De),p=n.project(D,ve);const a=F(p,u,We);a.y=Math.abs(a.y),g=ze,f=He,0===e||t.Cartesian3.dot(a,t.Cartesian3.UNIT_Y)>S?(g=he(n,R,m,u,ze),f=he(n,D,Z,p,He)):1===e?(f=he(n,D,Z,p,He),g.x=0,g.y=i.CesiumMath.sign(R.longitude-Math.abs(D.longitude)),g.z=0):(g=he(n,R,m,u,ze),f.x=0,f.y=i.CesiumMath.sign(R.longitude-D.longitude),f.z=0)}const w=t.Cartesian3.distance(a,U),y=c.EncodedCartesian3.fromCartesian(e,qe),I=t.Cartesian3.subtract(W,e,Be),v=t.Cartesian3.normalize(I,Ve);let z=t.Cartesian3.subtract(a,e,je);z=t.Cartesian3.normalize(z,z);let H=t.Cartesian3.cross(v,z,Ve);H=t.Cartesian3.normalize(H,H);let K=t.Cartesian3.cross(z,m,Ye);K=t.Cartesian3.normalize(K,K);let ee=t.Cartesian3.subtract(U,W,Ge);ee=t.Cartesian3.normalize(ee,ee);let te=t.Cartesian3.cross(Z,ee,Fe);te=t.Cartesian3.normalize(te,te);const ae=w/j,ne=$/j;let ie,re,se,oe=0,le=0,ce=0;if(C){oe=t.Cartesian3.distance(u,p),ie=c.EncodedCartesian3.fromCartesian(u,Xe),re=t.Cartesian3.subtract(p,u,We),se=t.Cartesian3.normalize(re,Ue);const e=se.x;se.x=se.y,se.y=-e,le=oe/N,ce=J/N}for(B=0;B<8;B++){const e=q+4*B,a=V+2*B,n=e+3,i=B<4?1:-1,r=2===B||3===B||6===B||7===B?1:-1;t.Cartesian3.pack(y.high,T,e),T[n]=I.x,t.Cartesian3.pack(y.low,E,e),E[n]=I.y,t.Cartesian3.pack(K,_,e),_[n]=I.z,t.Cartesian3.pack(te,O,e),O[n]=ae*i,t.Cartesian3.pack(H,b,e);let s=ne*r;0===s&&r<0&&(s=9),b[n]=s,C&&(A[e]=ie.high.x,A[e+1]=ie.high.y,A[e+2]=ie.low.x,A[e+3]=ie.low.y,L[e]=-g.y,L[e+1]=g.x,L[e+2]=f.y,L[e+3]=-f.x,k[e]=re.x,k[e+1]=re.y,k[e+2]=se.x,k[e+3]=se.y,x[a]=le*i,s=ce*r,0===s&&r<0&&(s=9),x[a+1]=s)}const Ce=Ne,pe=Re,de=xe,ge=Ie,fe=t.Rectangle.fromCartographicArray(Le,Se),we=P.getMinimumMaximumHeights(fe,h),Te=we.minimumTerrainHeight,Ee=we.maximumTerrainHeight;Q+=Te,Q+=Ee,me(e,a,Te,Ee,Ce,de),me(W,U,Te,Ee,pe,ge);let $e=t.Cartesian3.multiplyByScalar(H,i.CesiumMath.EPSILON5,Ze);t.Cartesian3.add(Ce,$e,Ce),t.Cartesian3.add(pe,$e,pe),t.Cartesian3.add(de,$e,de),t.Cartesian3.add(ge,$e,ge),ye(Ce,pe),ye(de,ge),t.Cartesian3.pack(Ce,M,Y),t.Cartesian3.pack(pe,M,Y+3),t.Cartesian3.pack(ge,M,Y+6),t.Cartesian3.pack(de,M,Y+9),$e=t.Cartesian3.multiplyByScalar(H,-2*i.CesiumMath.EPSILON5,Ze),t.Cartesian3.add(Ce,$e,Ce),t.Cartesian3.add(pe,$e,pe),t.Cartesian3.add(de,$e,de),t.Cartesian3.add(ge,$e,ge),ye(Ce,pe),ye(de,ge),t.Cartesian3.pack(Ce,M,Y+12),t.Cartesian3.pack(pe,M,Y+15),t.Cartesian3.pack(ge,M,Y+18),t.Cartesian3.pack(de,M,Y+21),G+=2,d+=3,V+=16,Y+=24,q+=32,$+=w,J+=oe}d=0;let K=0;for(p=0;p<g;p++){for(B=0;B<Qe;B++)y[d+B]=Je[B]+K;K+=8,d+=Qe}const ee=$e;e.BoundingSphere.fromVertices(r,t.Cartesian3.ZERO,3,ee[0]),e.BoundingSphere.fromVertices(s,t.Cartesian3.ZERO,3,ee[1]);const te=e.BoundingSphere.fromBoundingSpheres(ee);te.radius+=Q/(2*g);const ae={position:new u.GeometryAttribute({componentDatatype:i.ComponentDatatype.DOUBLE,componentsPerAttribute:3,normalize:!1,values:M}),startHiAndForwardOffsetX:Ke(T),startLoAndForwardOffsetY:Ke(E),startNormalAndForwardOffsetZ:Ke(_),endNormalAndTextureCoordinateNormalizationX:Ke(O),rightNormalAndTextureCoordinateNormalizationY:Ke(b)};return C&&(ae.startHiLo2D=Ke(A),ae.offsetAndRight2D=Ke(k),ae.startEndNormals2D=Ke(L),ae.texcoordNormalization2D=new u.GeometryAttribute({componentDatatype:i.ComponentDatatype.FLOAT,componentsPerAttribute:2,normalize:!1,values:x})),new u.Geometry({attributes:ae,indices:y,boundingSphere:te})}(p,f,B,j,H,z,o)};const oe=new t.Cartesian3,le=new t.Matrix3,ce=new e.Quaternion;function ue(a,n,r,s){const o=F(r,n,oe),l=t.Cartesian3.dot(o,a);if(l>S||l<x){const n=F(s,r,Z),o=l<x?i.CesiumMath.PI_OVER_TWO:-i.CesiumMath.PI_OVER_TWO,c=e.Quaternion.fromAxisAngle(n,o,ce),u=t.Matrix3.fromQuaternion(c,le);return t.Matrix3.multiplyByVector(u,a,a),!0}return!1}const Ce=new t.Cartographic,pe=new t.Cartesian3,de=new t.Cartesian3;function he(e,a,n,r,s){const o=t.Cartographic.toCartesian(a,e._ellipsoid,pe);let l=t.Cartesian3.add(o,n,de),c=!1;const u=e._ellipsoid;let C=u.cartesianToCartographic(l,Ce);Math.abs(a.longitude-C.longitude)>i.CesiumMath.PI_OVER_TWO&&(c=!0,l=t.Cartesian3.subtract(o,n,de),C=u.cartesianToCartographic(l,Ce)),C.height=0;const p=e.project(C,s);return(s=t.Cartesian3.subtract(p,r,s)).z=0,s=t.Cartesian3.normalize(s,s),c&&t.Cartesian3.negate(s,s),s}const ge=new t.Cartesian3,fe=new t.Cartesian3;function me(e,a,n,i,r,s){const o=t.Cartesian3.subtract(a,e,ge);t.Cartesian3.normalize(o,o);const l=n-0;let c=t.Cartesian3.multiplyByScalar(o,l,fe);t.Cartesian3.add(e,c,r);const u=i-1e3;c=t.Cartesian3.multiplyByScalar(o,u,fe),t.Cartesian3.add(a,c,s)}const we=new t.Cartesian3;function ye(e,a){const n=p.Plane.getPointDistance(J,e),r=p.Plane.getPointDistance(J,a);let s=we;i.CesiumMath.equalsEpsilon(n,0,i.CesiumMath.EPSILON2)?(s=F(a,e,s),t.Cartesian3.multiplyByScalar(s,i.CesiumMath.EPSILON2,s),t.Cartesian3.add(e,s,e)):i.CesiumMath.equalsEpsilon(r,0,i.CesiumMath.EPSILON2)&&(s=F(e,a,s),t.Cartesian3.multiplyByScalar(s,i.CesiumMath.EPSILON2,s),t.Cartesian3.add(a,s,a))}function Me(e,t){const a=Math.abs(e.longitude),n=Math.abs(t.longitude);if(i.CesiumMath.equalsEpsilon(a,i.CesiumMath.PI,i.CesiumMath.EPSILON11)){const n=i.CesiumMath.sign(t.longitude);return e.longitude=n*(a-i.CesiumMath.EPSILON11),1}if(i.CesiumMath.equalsEpsilon(n,i.CesiumMath.PI,i.CesiumMath.EPSILON11)){const a=i.CesiumMath.sign(e.longitude);return t.longitude=a*(n-i.CesiumMath.EPSILON11),2}return 0}const Te=new t.Cartographic,Ee=new t.Cartographic,_e=new t.Cartesian3,Oe=new t.Cartesian3,be=new t.Cartesian3,Pe=new t.Cartesian3,Ae=new t.Cartesian3,ke=new t.Cartesian3,Le=[Te,Ee],Se=new t.Rectangle,xe=new t.Cartesian3,Ie=new t.Cartesian3,Ne=new t.Cartesian3,Re=new t.Cartesian3,De=new t.Cartesian3,ve=new t.Cartesian3,ze=new t.Cartesian3,He=new t.Cartesian3,Be=new t.Cartesian3,je=new t.Cartesian3,Ge=new t.Cartesian3,Ve=new t.Cartesian3,Ye=new t.Cartesian3,Fe=new t.Cartesian3,qe=new c.EncodedCartesian3,Xe=new c.EncodedCartesian3,We=new t.Cartesian3,Ue=new t.Cartesian3,Ze=new t.Cartesian3,$e=[new e.BoundingSphere,new e.BoundingSphere],Je=[0,2,1,0,3,2,0,7,3,0,4,7,0,5,4,0,1,5,5,7,4,5,6,7,5,2,6,5,1,2,3,6,2,3,7,6],Qe=Je.length;function Ke(e){return new u.GeometryAttribute({componentDatatype:i.ComponentDatatype.FLOAT,componentsPerAttribute:4,normalize:!1,values:e})}return I._projectNormal=he,function(e,t){return P.initialize().then((function(){return n.defined(t)&&(e=I.unpack(e,t)),I.createGeometry(e)}))}}));