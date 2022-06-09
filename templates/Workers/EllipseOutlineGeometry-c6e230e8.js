define(["exports","./GeometryOffsetAttribute-821af768","./Transforms-f15de320","./Matrix2-c6c16658","./ComponentDatatype-3d0a0aac","./when-4bbc8319","./RuntimeError-5b082e8f","./EllipseGeometryLibrary-a4ac7ccc","./GeometryAttribute-8350368e","./GeometryAttributes-7827a6c2","./IndexDatatype-ddbc25a7"],(function(e,t,i,r,n,a,o,s,l,u,c){"use strict";const d=new r.Cartesian3;let p=new r.Cartesian3;const f=new i.BoundingSphere,m=new i.BoundingSphere;function h(e){const t=(e=a.defaultValue(e,a.defaultValue.EMPTY_OBJECT)).center,i=a.defaultValue(e.ellipsoid,r.Ellipsoid.WGS84),o=e.semiMajorAxis,s=e.semiMinorAxis,l=a.defaultValue(e.granularity,n.CesiumMath.RADIANS_PER_DEGREE),u=a.defaultValue(e.height,0),c=a.defaultValue(e.extrudedHeight,u);this._center=r.Cartesian3.clone(t),this._semiMajorAxis=o,this._semiMinorAxis=s,this._ellipsoid=r.Ellipsoid.clone(i),this._rotation=a.defaultValue(e.rotation,0),this._height=Math.max(c,u),this._granularity=l,this._extrudedHeight=Math.min(c,u),this._numberOfVerticalLines=Math.max(a.defaultValue(e.numberOfVerticalLines,16),0),this._offsetAttribute=e.offsetAttribute,this._workerName="createEllipseOutlineGeometry"}h.packedLength=r.Cartesian3.packedLength+r.Ellipsoid.packedLength+8,h.pack=function(e,t,i){return i=a.defaultValue(i,0),r.Cartesian3.pack(e._center,t,i),i+=r.Cartesian3.packedLength,r.Ellipsoid.pack(e._ellipsoid,t,i),i+=r.Ellipsoid.packedLength,t[i++]=e._semiMajorAxis,t[i++]=e._semiMinorAxis,t[i++]=e._rotation,t[i++]=e._height,t[i++]=e._granularity,t[i++]=e._extrudedHeight,t[i++]=e._numberOfVerticalLines,t[i]=a.defaultValue(e._offsetAttribute,-1),t};const y=new r.Cartesian3,b=new r.Ellipsoid,A={center:y,ellipsoid:b,semiMajorAxis:void 0,semiMinorAxis:void 0,rotation:void 0,height:void 0,granularity:void 0,extrudedHeight:void 0,numberOfVerticalLines:void 0,offsetAttribute:void 0};h.unpack=function(e,t,i){t=a.defaultValue(t,0);const n=r.Cartesian3.unpack(e,t,y);t+=r.Cartesian3.packedLength;const o=r.Ellipsoid.unpack(e,t,b);t+=r.Ellipsoid.packedLength;const s=e[t++],l=e[t++],u=e[t++],c=e[t++],d=e[t++],p=e[t++],f=e[t++],m=e[t];return a.defined(i)?(i._center=r.Cartesian3.clone(n,i._center),i._ellipsoid=r.Ellipsoid.clone(o,i._ellipsoid),i._semiMajorAxis=s,i._semiMinorAxis=l,i._rotation=u,i._height=c,i._granularity=d,i._extrudedHeight=p,i._numberOfVerticalLines=f,i._offsetAttribute=-1===m?void 0:m,i):(A.height=c,A.extrudedHeight=p,A.granularity=d,A.rotation=u,A.semiMajorAxis=s,A.semiMinorAxis=l,A.numberOfVerticalLines=f,A.offsetAttribute=-1===m?void 0:m,new h(A))},h.createGeometry=function(e){if(e._semiMajorAxis<=0||e._semiMinorAxis<=0)return;const o=e._height,h=e._extrudedHeight,y=!n.CesiumMath.equalsEpsilon(o,h,0,n.CesiumMath.EPSILON2);e._center=e._ellipsoid.scaleToGeodeticSurface(e._center,e._center);const b={center:e._center,semiMajorAxis:e._semiMajorAxis,semiMinorAxis:e._semiMinorAxis,ellipsoid:e._ellipsoid,rotation:e._rotation,height:o,granularity:e._granularity,numberOfVerticalLines:e._numberOfVerticalLines};let A;if(y)b.extrudedHeight=h,b.offsetAttribute=e._offsetAttribute,A=function(e){const o=e.center,p=e.ellipsoid,h=e.semiMajorAxis;let y=r.Cartesian3.multiplyByScalar(p.geodeticSurfaceNormal(o,d),e.height,d);f.center=r.Cartesian3.add(o,y,f.center),f.radius=h,y=r.Cartesian3.multiplyByScalar(p.geodeticSurfaceNormal(o,y),e.extrudedHeight,y),m.center=r.Cartesian3.add(o,y,m.center),m.radius=h;let b=s.EllipseGeometryLibrary.computeEllipsePositions(e,!1,!0).outerPositions;const A=new u.GeometryAttributes({position:new l.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:s.EllipseGeometryLibrary.raisePositionsToHeight(b,e,!0)})});b=A.position.values;const _=i.BoundingSphere.union(f,m);let g=b.length/3;if(a.defined(e.offsetAttribute)){let i=new Uint8Array(g);if(e.offsetAttribute===t.GeometryOffsetAttribute.TOP)i=t.arrayFill(i,1,0,g/2);else{const r=e.offsetAttribute===t.GeometryOffsetAttribute.NONE?0:1;i=t.arrayFill(i,r)}A.applyOffset=new l.GeometryAttribute({componentDatatype:n.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:i})}let x=a.defaultValue(e.numberOfVerticalLines,16);x=n.CesiumMath.clamp(x,0,g/2);const E=c.IndexDatatype.createTypedArray(g,2*g+2*x);g/=2;let M,C,G=0;for(M=0;M<g;++M)E[G++]=M,E[G++]=(M+1)%g,E[G++]=M+g,E[G++]=(M+1)%g+g;if(x>0){const e=Math.min(x,g);C=Math.round(g/e);const t=Math.min(C*x,g);for(M=0;M<t;M+=C)E[G++]=M,E[G++]=M+g}return{boundingSphere:_,attributes:A,indices:E}}(b);else if(A=function(e){const t=e.center;p=r.Cartesian3.multiplyByScalar(e.ellipsoid.geodeticSurfaceNormal(t,p),e.height,p),p=r.Cartesian3.add(t,p,p);const a=new i.BoundingSphere(p,e.semiMajorAxis),o=s.EllipseGeometryLibrary.computeEllipsePositions(e,!1,!0).outerPositions,d=new u.GeometryAttributes({position:new l.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:s.EllipseGeometryLibrary.raisePositionsToHeight(o,e,!1)})}),f=o.length/3,m=c.IndexDatatype.createTypedArray(f,2*f);let h=0;for(let i=0;i<f;++i)m[h++]=i,m[h++]=(i+1)%f;return{boundingSphere:a,attributes:d,indices:m}}(b),a.defined(e._offsetAttribute)){const i=A.attributes.position.values.length,r=new Uint8Array(i/3),a=e._offsetAttribute===t.GeometryOffsetAttribute.NONE?0:1;t.arrayFill(r,a),A.attributes.applyOffset=new l.GeometryAttribute({componentDatatype:n.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:r})}return new l.Geometry({attributes:A.attributes,indices:A.indices,primitiveType:l.PrimitiveType.LINES,boundingSphere:A.boundingSphere,offsetAttribute:e._offsetAttribute})},e.EllipseOutlineGeometry=h}));