define(["./AttributeCompression-f7a901f9","./Matrix2-c6c16658","./combine-e9466e32","./IndexDatatype-ddbc25a7","./ComponentDatatype-3d0a0aac","./createTaskProcessorWorker","./RuntimeError-5b082e8f","./when-4bbc8319","./WebGLConstants-508b9636"],(function(t,e,a,s,n,r,i,o,c){"use strict";const d=32767,l=Math.cos(n.CesiumMath.toRadians(150)),f=new e.Cartographic,h=new e.Cartesian3,u=new e.Cartographic,C=new e.Cartographic;function p(t){const e=8*t,a=3*e,n=4*e;this.startEllipsoidNormals=new Float32Array(a),this.endEllipsoidNormals=new Float32Array(a),this.startPositionAndHeights=new Float32Array(n),this.startFaceNormalAndVertexCornerIds=new Float32Array(n),this.endPositionAndHeights=new Float32Array(n),this.endFaceNormalAndHalfWidths=new Float32Array(n),this.vertexBatchIds=new Uint16Array(e),this.indices=s.IndexDatatype.createTypedArray(e,36*t),this.vec3Offset=0,this.vec4Offset=0,this.batchIdOffset=0,this.indexOffset=0,this.volumeStartIndex=0}const m=new e.Cartesian3,b=new e.Cartesian3;function A(t,a,s,n,r){const i=e.Cartesian3.subtract(s,a,b);let o=e.Cartesian3.subtract(a,t,m);return e.Cartesian3.normalize(i,i),e.Cartesian3.normalize(o,o),e.Cartesian3.dot(i,o)<l&&(o=e.Cartesian3.multiplyByScalar(o,-1,m)),e.Cartesian3.add(i,o,r),e.Cartesian3.equals(r,e.Cartesian3.ZERO)&&(r=e.Cartesian3.subtract(t,a)),e.Cartesian3.cross(r,n,r),e.Cartesian3.cross(n,r,r),e.Cartesian3.normalize(r,r),r}const w=[0,2,6,0,6,4,0,1,3,0,3,2,0,4,5,0,5,1,5,3,1,5,7,3,7,5,4,7,4,6,7,6,2,7,2,3],g=w.length,y=new e.Cartesian3,N=new e.Cartesian3,k=new e.Cartesian3,I=new e.Cartesian3,x=new e.Cartesian3;p.prototype.addVolume=function(t,a,s,n,r,i,o,c,d,l){let f=e.Cartesian3.add(a,d,y);const h=l.geodeticSurfaceNormal(f,N);f=e.Cartesian3.add(s,d,y);const u=l.geodeticSurfaceNormal(f,I),C=A(t,a,s,h,k),p=A(n,s,a,u,x),m=this.startEllipsoidNormals,b=this.endEllipsoidNormals,E=this.startPositionAndHeights,F=this.startFaceNormalAndVertexCornerIds,H=this.endPositionAndHeights,O=this.endFaceNormalAndHalfWidths,P=this.vertexBatchIds;let v,D=this.batchIdOffset,S=this.vec3Offset,M=this.vec4Offset;for(v=0;v<8;v++)e.Cartesian3.pack(h,m,S),e.Cartesian3.pack(u,b,S),e.Cartesian3.pack(a,E,M),E[M+3]=r,e.Cartesian3.pack(s,H,M),H[M+3]=i,e.Cartesian3.pack(C,F,M),F[M+3]=v,e.Cartesian3.pack(p,O,M),O[M+3]=o,P[D++]=c,S+=3,M+=4;this.batchIdOffset=D,this.vec3Offset=S,this.vec4Offset=M;const R=this.indices,U=this.volumeStartIndex,B=this.indexOffset;for(v=0;v<g;v++)R[B+v]=w[v]+U;this.volumeStartIndex+=8,this.indexOffset+=g};const E=new e.Rectangle,F=new e.Ellipsoid,H=new e.Cartesian3,O=new e.Cartesian3,P=new e.Cartesian3,v=new e.Cartesian3,D=new e.Cartesian3;return r((function(r,i){const o=new Uint16Array(r.positions),c=new Uint16Array(r.widths),l=new Uint32Array(r.counts),m=new Uint16Array(r.batchIds),b=E,A=F,w=H,g=new Float64Array(r.packedBuffer);let y=0;const N=g[y++],k=g[y++];let I;e.Rectangle.unpack(g,y,b),y+=e.Rectangle.packedLength,e.Ellipsoid.unpack(g,y,A),y+=e.Ellipsoid.packedLength,e.Cartesian3.unpack(g,y,w);let x=o.length/3;const S=o.subarray(0,x),M=o.subarray(x,2*x),R=o.subarray(2*x,3*x);t.AttributeCompression.zigZagDeltaDecode(S,M,R),function(t,a,s,n){const r=n.length,i=t.length,o=new Uint8Array(i),c=u,d=C;let l=0;for(let h=0;h<r;h++){const s=n[h];let r=s;for(let n=1;n<s;n++){const s=l+n,i=s-1;d.longitude=t[s],d.latitude=a[s],c.longitude=t[i],c.latitude=a[i],e.Cartographic.equals(d,c)&&(r--,o[i]=1)}n[h]=r,l+=s}let f=0;for(let e=0;e<i;e++)1!==o[e]&&(t[f]=t[e],a[f]=a[e],s[f]=s[e],f++)}(S,M,R,l);const U=l.length;let B=0;for(I=0;I<U;I++)B+=l[I]-1;const T=new p(B),V=function(t,a,s,r,i,o,c){const l=t.length,u=new Float64Array(3*l);for(let C=0;C<l;++C){const l=t[C],p=a[C],m=s[C],b=n.CesiumMath.lerp(r.west,r.east,l/d),A=n.CesiumMath.lerp(r.south,r.north,p/d),w=n.CesiumMath.lerp(i,o,m/d),g=e.Cartographic.fromRadians(b,A,w,f),y=c.cartographicToCartesian(g,h);e.Cartesian3.pack(y,u,3*C)}return u}(S,M,R,b,N,k,A);x=S.length;const W=new Float32Array(3*x);for(I=0;I<x;++I)W[3*I]=V[3*I]-w.x,W[3*I+1]=V[3*I+1]-w.y,W[3*I+2]=V[3*I+2]-w.z;let z=0,q=0;for(I=0;I<U;I++){const t=l[I]-1,a=.5*c[I],s=m[I],r=z;for(let i=0;i<t;i++){const o=e.Cartesian3.unpack(W,z,P),c=e.Cartesian3.unpack(W,z+3,v);let l=R[q],f=R[q+1];l=n.CesiumMath.lerp(N,k,l/d),f=n.CesiumMath.lerp(N,k,f/d),q++;let h=O,u=D;if(0===i){const a=r+3*t,s=e.Cartesian3.unpack(W,a,O);if(e.Cartesian3.equals(s,o))e.Cartesian3.unpack(W,a-3,h);else{const t=e.Cartesian3.subtract(o,c,O);h=e.Cartesian3.add(t,o,O)}}else e.Cartesian3.unpack(W,z-3,h);if(i===t-1){const t=e.Cartesian3.unpack(W,r,D);if(e.Cartesian3.equals(t,c))e.Cartesian3.unpack(W,r+3,u);else{const t=e.Cartesian3.subtract(c,o,D);u=e.Cartesian3.add(t,c,D)}}else e.Cartesian3.unpack(W,z+6,u);T.addVolume(h,o,c,u,l,f,a,s,w,A),z+=3}z+=3,q++}const L=T.indices;i.push(T.startEllipsoidNormals.buffer),i.push(T.endEllipsoidNormals.buffer),i.push(T.startPositionAndHeights.buffer),i.push(T.startFaceNormalAndVertexCornerIds.buffer),i.push(T.endPositionAndHeights.buffer),i.push(T.endFaceNormalAndHalfWidths.buffer),i.push(T.vertexBatchIds.buffer),i.push(L.buffer);let _={indexDatatype:2===L.BYTES_PER_ELEMENT?s.IndexDatatype.UNSIGNED_SHORT:s.IndexDatatype.UNSIGNED_INT,startEllipsoidNormals:T.startEllipsoidNormals.buffer,endEllipsoidNormals:T.endEllipsoidNormals.buffer,startPositionAndHeights:T.startPositionAndHeights.buffer,startFaceNormalAndVertexCornerIds:T.startFaceNormalAndVertexCornerIds.buffer,endPositionAndHeights:T.endPositionAndHeights.buffer,endFaceNormalAndHalfWidths:T.endFaceNormalAndHalfWidths.buffer,vertexBatchIds:T.vertexBatchIds.buffer,indices:L.buffer};if(r.keepDecodedPositions){const t=function(t){const e=t.length,a=new Uint32Array(e+1);let s=0;for(let n=0;n<e;++n)a[n]=s,s+=t[n];return a[e]=s,a}(l);i.push(V.buffer,t.buffer),_=a.combine(_,{decodedPositions:V.buffer,decodedPositionOffsets:t.buffer})}return _}))}));