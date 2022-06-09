define(["./AxisAlignedBoundingBox-a572809f","./Transforms-f15de320","./Matrix2-c6c16658","./when-4bbc8319","./TerrainEncoding-6d07f5d8","./ComponentDatatype-3d0a0aac","./OrientedBoundingBox-f3d80bd4","./RuntimeError-5b082e8f","./WebMercatorProjection-baa60d8a","./createTaskProcessorWorker","./combine-e9466e32","./AttributeCompression-f7a901f9","./WebGLConstants-508b9636","./EllipsoidTangentPlane-41514392","./IntersectionTests-a4e54d9a","./Plane-26e67b94"],(function(t,e,n,i,o,a,r,s,c,u,h,d,l,g,m,p){"use strict";const I=Uint16Array.BYTES_PER_ELEMENT,f=Int32Array.BYTES_PER_ELEMENT,E=Uint32Array.BYTES_PER_ELEMENT,T=Float32Array.BYTES_PER_ELEMENT,C=Float64Array.BYTES_PER_ELEMENT;function M(t,e,n){n=i.defaultValue(n,a.CesiumMath);const o=t.length;for(let i=0;i<o;++i)if(n.equalsEpsilon(t[i],e,a.CesiumMath.EPSILON12))return i;return-1}const x=new n.Cartographic,N=new n.Cartesian3,b=new n.Cartesian3,S=new n.Cartesian3,w=new n.Matrix4;function B(t,e,o,r,s,c,u,h,d,l,g){const m=h.length;for(let p=0;p<m;++p){const I=h[p],f=I.cartographic,E=I.index,T=t.length,C=f.longitude;let M=f.latitude;M=a.CesiumMath.clamp(M,-a.CesiumMath.PI_OVER_TWO,a.CesiumMath.PI_OVER_TWO);const b=f.height-u.skirtHeight;u.hMin=Math.min(u.hMin,b),n.Cartographic.fromRadians(C,M,b,x),l&&(x.longitude+=d),l?p===m-1?x.latitude+=g:0===p&&(x.latitude-=g):x.latitude+=d;const S=u.ellipsoid.cartographicToCartesian(x);t.push(S),e.push(b),o.push(n.Cartesian2.clone(o[E])),r.length>0&&r.push(r[E]),s.length>0&&s.push(s[E]),n.Matrix4.multiplyByPoint(u.toENU,S,N);const w=u.minimum,B=u.maximum;n.Cartesian3.minimumByComponent(N,w,w),n.Cartesian3.maximumByComponent(N,B,B);const P=u.lastBorderPoint;if(i.defined(P)){const t=P.index;c.push(t,T-1,T,T,E,t)}u.lastBorderPoint=I}}return u((function(u,h){u.ellipsoid=n.Ellipsoid.clone(u.ellipsoid),u.rectangle=n.Rectangle.clone(u.rectangle);const d=function(u,h,d,l,g,m,p,P,A,y,R){let _,W,v,F,O,Y;i.defined(l)?(_=l.west,W=l.south,v=l.east,F=l.north,O=l.width,Y=l.height):(_=a.CesiumMath.toRadians(g.west),W=a.CesiumMath.toRadians(g.south),v=a.CesiumMath.toRadians(g.east),F=a.CesiumMath.toRadians(g.north),O=a.CesiumMath.toRadians(l.width),Y=a.CesiumMath.toRadians(l.height));const U=[W,F],V=[_,v],k=e.Transforms.eastNorthUpToFixedFrame(h,d),H=n.Matrix4.inverseTransformation(k,w);let L,D;A&&(L=c.WebMercatorProjection.geodeticLatitudeToMercatorAngle(W),D=1/(c.WebMercatorProjection.geodeticLatitudeToMercatorAngle(F)-L));const G=1!==m,j=new DataView(u);let z=Number.POSITIVE_INFINITY,q=Number.NEGATIVE_INFINITY;const J=b;J.x=Number.POSITIVE_INFINITY,J.y=Number.POSITIVE_INFINITY,J.z=Number.POSITIVE_INFINITY;const K=S;K.x=Number.NEGATIVE_INFINITY,K.y=Number.NEGATIVE_INFINITY,K.z=Number.NEGATIVE_INFINITY;let Q,X,Z=0,$=0,tt=0;for(X=0;X<4;++X){let t=Z;Q=j.getUint32(t,!0),t+=E;const e=a.CesiumMath.toRadians(180*j.getFloat64(t,!0));t+=C,-1===M(V,e)&&V.push(e);const n=a.CesiumMath.toRadians(180*j.getFloat64(t,!0));t+=C,-1===M(U,n)&&U.push(n),t+=2*C;let i=j.getInt32(t,!0);t+=f,$+=i,i=j.getInt32(t,!0),tt+=3*i,Z+=Q+E}const et=[],nt=[],it=new Array($),ot=new Array($),at=new Array($),rt=A?new Array($):[],st=G?new Array($):[],ct=new Array(tt),ut=[],ht=[],dt=[],lt=[];let gt=0,mt=0;for(Z=0,X=0;X<4;++X){Q=j.getUint32(Z,!0),Z+=E;const t=Z,e=a.CesiumMath.toRadians(180*j.getFloat64(Z,!0));Z+=C;const i=a.CesiumMath.toRadians(180*j.getFloat64(Z,!0));Z+=C;const o=a.CesiumMath.toRadians(180*j.getFloat64(Z,!0)),r=.5*o;Z+=C;const u=a.CesiumMath.toRadians(180*j.getFloat64(Z,!0)),h=.5*u;Z+=C;const l=j.getInt32(Z,!0);Z+=f;const g=j.getInt32(Z,!0);Z+=f,Z+=f;const m=new Array(l);for(let s=0;s<l;++s){const t=e+j.getUint8(Z++)*o;x.longitude=t;const l=i+j.getUint8(Z++)*u;x.latitude=l;let g=j.getFloat32(Z,!0);if(Z+=T,0!==g&&g<R&&(g*=-Math.pow(2,y)),g*=6371010,x.height=g,-1!==M(V,t)||-1!==M(U,l)){const t=M(et,x,n.Cartographic);if(-1!==t){m[s]=nt[t];continue}et.push(n.Cartographic.clone(x)),nt.push(gt)}m[s]=gt,Math.abs(t-_)<r?ut.push({index:gt,cartographic:n.Cartographic.clone(x)}):Math.abs(t-v)<r?dt.push({index:gt,cartographic:n.Cartographic.clone(x)}):Math.abs(l-W)<h?ht.push({index:gt,cartographic:n.Cartographic.clone(x)}):Math.abs(l-F)<h&&lt.push({index:gt,cartographic:n.Cartographic.clone(x)}),z=Math.min(g,z),q=Math.max(g,q),at[gt]=g;const p=d.cartographicToCartesian(x);if(it[gt]=p,A&&(rt[gt]=(c.WebMercatorProjection.geodeticLatitudeToMercatorAngle(l)-L)*D),G){const t=d.geodeticSurfaceNormal(p);st[gt]=t}n.Matrix4.multiplyByPoint(H,p,N),n.Cartesian3.minimumByComponent(N,J,J),n.Cartesian3.maximumByComponent(N,K,K);let I=(t-_)/(v-_);I=a.CesiumMath.clamp(I,0,1);let f=(l-W)/(F-W);f=a.CesiumMath.clamp(f,0,1),ot[gt]=new n.Cartesian2(I,f),++gt}const p=3*g;for(let n=0;n<p;++n,++mt)ct[mt]=m[j.getUint16(Z,!0)],Z+=I;if(Q!==Z-t)throw new s.RuntimeError("Invalid terrain tile.")}it.length=gt,ot.length=gt,at.length=gt,A&&(rt.length=gt),G&&(st.length=gt);const pt=gt,It=mt,ft={hMin:z,lastBorderPoint:void 0,skirtHeight:P,toENU:H,ellipsoid:d,minimum:J,maximum:K};ut.sort((function(t,e){return e.cartographic.latitude-t.cartographic.latitude})),ht.sort((function(t,e){return t.cartographic.longitude-e.cartographic.longitude})),dt.sort((function(t,e){return t.cartographic.latitude-e.cartographic.latitude})),lt.sort((function(t,e){return e.cartographic.longitude-t.cartographic.longitude}));const Et=1e-5;if(B(it,at,ot,rt,st,ct,ft,ut,-Et*O,!0,-Et*Y),B(it,at,ot,rt,st,ct,ft,ht,-Et*Y,!1),B(it,at,ot,rt,st,ct,ft,dt,Et*O,!0,Et*Y),B(it,at,ot,rt,st,ct,ft,lt,Et*Y,!1),ut.length>0&&lt.length>0){const t=ut[0].index,e=pt,n=lt[lt.length-1].index,i=it.length-1;ct.push(n,i,e,e,t,n)}$=it.length;const Tt=e.BoundingSphere.fromPoints(it);let Ct;i.defined(l)&&(Ct=r.OrientedBoundingBox.fromRectangle(l,z,q,d));const Mt=new o.EllipsoidalOccluder(d).computeHorizonCullingPointPossiblyUnderEllipsoid(h,it,z),xt=new t.AxisAlignedBoundingBox(J,K,h),Nt=new o.TerrainEncoding(h,xt,ft.hMin,q,k,!1,A,G,m,p),bt=new Float32Array($*Nt.stride);let St=0;for(let t=0;t<$;++t)St=Nt.encode(bt,St,it[t],ot[t],at[t],void 0,rt[t],st[t]);const wt=ut.map((function(t){return t.index})).reverse(),Bt=ht.map((function(t){return t.index})).reverse(),Pt=dt.map((function(t){return t.index})).reverse(),At=lt.map((function(t){return t.index})).reverse();return Bt.unshift(Pt[Pt.length-1]),Bt.push(wt[0]),At.unshift(wt[wt.length-1]),At.push(Pt[0]),{vertices:bt,indices:new Uint16Array(ct),maximumHeight:q,minimumHeight:z,encoding:Nt,boundingSphere3D:Tt,orientedBoundingBox:Ct,occludeePointInScaledSpace:Mt,vertexCountWithoutSkirts:pt,indexCountWithoutSkirts:It,westIndicesSouthToNorth:wt,southIndicesEastToWest:Bt,eastIndicesNorthToSouth:Pt,northIndicesWestToEast:At}}(u.buffer,u.relativeToCenter,u.ellipsoid,u.rectangle,u.nativeRectangle,u.exaggeration,u.exaggerationRelativeHeight,u.skirtHeight,u.includeWebMercatorT,u.negativeAltitudeExponentBias,u.negativeElevationThreshold),l=d.vertices;h.push(l.buffer);const g=d.indices;return h.push(g.buffer),{vertices:l.buffer,indices:g.buffer,numberOfAttributes:d.encoding.stride,minimumHeight:d.minimumHeight,maximumHeight:d.maximumHeight,boundingSphere3D:d.boundingSphere3D,orientedBoundingBox:d.orientedBoundingBox,occludeePointInScaledSpace:d.occludeePointInScaledSpace,encoding:d.encoding,vertexCountWithoutSkirts:d.vertexCountWithoutSkirts,indexCountWithoutSkirts:d.indexCountWithoutSkirts,westIndicesSouthToNorth:d.westIndicesSouthToNorth,southIndicesEastToWest:d.southIndicesEastToWest,eastIndicesNorthToSouth:d.eastIndicesNorthToSouth,northIndicesWestToEast:d.northIndicesWestToEast}}))}));