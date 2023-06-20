(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const h of o.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&i(h)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();const u=(n,e)=>Math.floor(Math.random()*(e-n+1))+n,g=()=>{const n={r:0,g:0,b:0};for(const e in n)n[e]=u(0,255);return`rgb(${n.r}, ${n.g}, ${n.b})`},y=(n,{fontSize:e=18,fontFamily:t="Arial",text:i})=>{n.save(),n.font=`${e}px ${t}`;const s=n.measureText(i);return n.restore(),s},c=(n,e)=>Math.atan2(e.y-n.y,e.x-n.x);class l{constructor({ctx:e,x:t,y:i,angle:s=null,text:o,fontSize:h=18}){this.ctx=e,this.x=t,this.y=i,this.text=o,this.fontFamily="Arial",this.fontSize=h,this.angle=s,this.caret=null,this.isCaretActive=!0,this.isCaretVisible=!0,this.caretInterval=null,this.init()}init(){this.caretInterval=setInterval(()=>this.isCaretVisible=!this.isCaretVisible,500)}applyFontStyle(){this.ctx.font=`${this.fontSize}px ${this.fontFamily}`}get textProps(){return y(this.ctx,{fontSize:this.fontSize,fontFamily:this.fontFamily,text:this.text})}get textPosition(){const{width:e}=this.textProps,t={x:this.x-e/2,y:this.y};if(!this.angle)return t;const i=Math.cos(this.angle),s=Math.sin(this.angle),o=(e/2+5)*Math.sign(i),h=15*Math.sign(s),r=s*Math.pow(Math.abs(s),40)*o-i*Math.pow(Math.abs(i),10)*h;return t.x+=o-s*r,t.y+=h+i*r,t}draw(){this.ctx.save(),this.applyFontStyle();const{x:e,y:t}=this.textPosition;this.ctx.textBaseline="middle",this.ctx.fillText(this.text,e,t),this.ctx.restore(),this.isCaretActive&&this.drawCaret()}drawCaret(){if(!this.isCaretVisible)return;this.applyFontStyle();const{width:e}=this.textProps,{x:t,y:i}=this.textPosition,s=1;this.ctx.beginPath(),this.ctx.moveTo(t+e+s,i-this.fontSize/2),this.ctx.lineTo(t+e+s,i+this.fontSize/2),this.ctx.stroke(),this.ctx.closePath()}setText(e){this.text=e}updatePostition({x:e,y:t,angle:i}){this.x=e,this.y=t,this.angle=i}}class b{constructor({ctx:e,hitCtx:t,hitColor:i,x:s,y:o}){this.ctx=e,this.hitCtx=t,this.hitColor=i,this.x=s,this.y=o,this.isSelected=!1,this.text=new l({ctx:this.ctx,x:this.x,y:this.y,text:""}),this.radius=40}drawNode(e=!1){const t=e?this.hitCtx:this.ctx;t.save(),t.beginPath(),t.arc(this.x,this.y,this.radius,0,2*Math.PI),e?(t.fillStyle=this.hitColor,t.fill()):(t.strokeStyle=this.isSelected?"#ff0000":"#000000",t.stroke()),t.closePath(),t.restore()}movePosition(e){const{x:t,y:i}={x:e.x-this.x,y:e.y-this.y};this.x+=t,this.y+=i,this.text.x=this.x,this.text.y=this.y}draw(){this.drawNode(),this.drawNode(!0),this.text.draw(),this.text.isCaretActive=this.isSelected}}class C{constructor({ctx:e,hitCtx:t,hitColor:i,sourceNode:s,targetNode:o,isPlaceholderLine:h=!1,lineOffset:r=null}){this.ctx=e,this.sourceNode=s,this.targetNode=o,this.hitCtx=t,this.hitColor=i,this.isPlaceholderLine=h,this.arrowHeadLength=15,this.lineOffset=r,this.isSelected=!1,this.initialText="";const{x:a,y:x,angle:f}=this.textPosition;this.text=new l({x:a,y:x,angle:f,ctx:this.ctx,text:this.initialText})}get delta(){return{x:this.targetNode.x-this.sourceNode.x,y:this.targetNode.y-this.sourceNode.y}}get textPosition(){const e={x:this.sourceNode.x+Math.cos(this.angle)*this.lineOffset,y:this.sourceNode.y+Math.sin(this.angle)*this.lineOffset},t={x:this.targetNode.x-Math.cos(this.angle)*this.lineOffset,y:this.targetNode.y-Math.sin(this.angle)*this.lineOffset};return{angle:Math.atan2(t.x-e.x,e.y-t.y)+Math.PI,x:(e.x+t.x)/2,y:(e.y+t.y)/2}}get angle(){return Math.atan2(this.delta.y,this.delta.x)}drawArrowHead(e,t=!1){const i=t?this.hitCtx:this.ctx,s={x:this.targetNode.x-Math.cos(this.angle)*this.lineOffset,y:this.targetNode.y-Math.sin(this.angle)*this.lineOffset},o={x:s.x-e.x,y:s.y-e.y};i.save(),i.beginPath(),i.moveTo(e.x+.5*o.y,e.y-.5*o.x),i.lineTo(e.x-.5*o.y,e.y+.5*o.x),i.lineTo(s.x,s.y),i.closePath(),i.fillStyle=t?this.hitColor:this.isSelected?"#ff0000":"#000000",i.fill(),i.restore()}drawLine(e=!1){const t=e?this.hitCtx:this.ctx,i={x:this.sourceNode.x+Math.cos(this.angle)*this.lineOffset,y:this.sourceNode.y+Math.sin(this.angle)*this.lineOffset},s={x:this.targetNode.x-Math.cos(this.angle)*(this.arrowHeadLength+this.lineOffset),y:this.targetNode.y-Math.sin(this.angle)*(this.arrowHeadLength+this.lineOffset)};t.save(),t.beginPath(),t.moveTo(i.x,i.y),t.lineTo(s.x,s.y),e&&(t.lineWidth=15),t.strokeStyle=e?this.hitColor:this.isSelected?"#ff0000":"#000000",t.stroke(),t.closePath(),t.restore(),this.drawArrowHead(s,e)}draw(){this.drawLine(),this.drawLine(!0),this.text.draw(),this.text.updatePostition(this.textPosition),this.text.isCaretActive=this.isSelected}}class L{constructor({ctx:e,hitCtx:t,hitColor:i,isPlaceholderLine:s,node:o,angle:h}){this.ctx=e,this.hitCtx=t,this.hitColor=i,this.angle=h,this.node=o,this.arrowHeadLength=12,this.radius=25,this.isSelected=!1,this.initialText="",this.isPlaceholderLine=s;const{x:r,y:a}=this.textPosition;this.text=new l({x:r,y:a,angle:this.angle,ctx:this.ctx,text:this.initialText})}get textPosition(){const e=this.node.radius+this.radius/2+this.radius,t=Math.cos(this.angle)*e,i=Math.sin(this.angle)*e;return{x:this.node.x+t,y:this.node.y+i}}drawArrow(e=!1){const t=e?this.hitCtx:this.ctx,i=this.angle+Math.PI*.15,s={x:this.node.x+(this.node.radius+this.arrowHeadLength)*Math.cos(i),y:this.node.y+(this.node.radius+this.arrowHeadLength)*Math.sin(i)},o={x:this.node.x+this.node.radius*Math.cos(i),y:this.node.y+this.node.radius*Math.sin(i)},h={x:o.x-s.x,y:o.y-s.y};t.save(),t.beginPath(),t.moveTo(s.x+.5*h.y,s.y-.5*h.x),t.lineTo(s.x-.5*h.y,s.y+.5*h.x),t.lineTo(o.x,o.y),t.closePath(),t.fillStyle=e?this.hitColor:this.isSelected?"#ff0000":"#000",t.fill(),t.restore()}drawLoopLine(e=!1){const t=e?this.hitCtx:this.ctx,i=Math.cos(this.angle)*(this.node.radius+this.radius/2),s=Math.sin(this.angle)*(this.node.radius+this.radius/2);t.save(),t.beginPath(),t.arc(this.node.x+i,this.node.y+s,this.radius,this.angle-Math.PI*.75,this.angle+Math.PI*.75),e&&(t.lineWidth=10),t.strokeStyle=e?this.hitColor:this.isSelected?"#ff0000":"#000",t.stroke(),t.closePath(),t.restore(),this.drawArrow(e)}draw(){this.drawLoopLine(),this.drawLoopLine(!0),this.text.draw(),this.text.isCaretActive=this.isSelected,this.text.updatePostition({...this.textPosition,angle:this.angle})}}class p{constructor({canvas:e}){this.canvas=e,this.ctx=this.canvas.getContext("2d"),this.hitCanvas=document.createElement("canvas"),this.hitCanvasCtx=this.hitCanvas.getContext("2d",{willReadFrequently:!0}),this.objects={},this.placeholderLine=null,this.isMouseDown=!1,this.draggedObject=null,this.initHitCanvas()}init(){this.registerEventListener(),this.render()}initHitCanvas(){this.hitCanvas.width=this.canvas.width,this.hitCanvas.height=this.canvas.height}registerEventListener(){this.canvas.addEventListener("dblclick",this.handleDoubleClick.bind(this)),this.canvas.addEventListener("mousedown",this.handleMouseDown.bind(this)),this.canvas.addEventListener("mousemove",this.handleMouseMove.bind(this)),this.canvas.addEventListener("mouseup",this.handleMouseUp.bind(this)),window.addEventListener("keydown",this.handleKeyDown.bind(this))}handleKeyDown(e){const{keyCode:t}=e;if(!this.selectedObject)return;const{text:i}=this.selectedObject.text;t>64&&t<91||t>96&&t<123||t>47&&t<58||t===32?this.selectedObject.text.setText(`${i}${e.key}`):e.key==="Backspace"?this.selectedObject.text.setText(i.substring(0,i.length-1)):e.key==="Delete"&&this.deleteObject()}handleMouseDown(e){const{offsetX:t,offsetY:i}=e,s=this.getObjectByCoordinate({x:t,y:i});if(this.selectedObject&&(this.selectedObject.isSelected=!1),!!s){if(this.isMouseDown=!0,s.isSelected=!0,e.shiftKey&&s.constructor.name==="Node"){this.placeholderLine=this.createLoopLine({node:s,cursorCoordinate:{x:t,y:i},isPlaceholderLine:!0});return}this.draggedObject=s}}handleMouseMove(e){if(!this.isMouseDown)return;const{offsetX:t,offsetY:i}=e;if(this.placeholderLine){const s=this.getObjectByCoordinate({x:t,y:i});if(s&&s.constructor.name==="Node"&&s===this.selectedObject)if(this.placeholderLine.constructor.name==="LoopLine"){const o=c(this.selectedObject,{x:t,y:i});this.placeholderLine.angle=o}else this.placeholderLine=this.createLoopLine({node:s,cursorCoordinate:{x:t,y:i},isPlaceholderLine:!0});else this.placeholderLine.constructor.name==="Line"?this.placeholderLine.targetNode={x:t,y:i}:this.placeholderLine=this.createLine({sourceNode:this.selectedObject,targetNode:{x:t,y:i},isPlaceholderLine:!0});return}if(!(!this.draggedObject||this.draggedObject.constructor.name==="Line")){if(this.draggedObject.constructor.name==="Node")this.draggedObject.movePosition({x:t,y:i});else if(this.draggedObject.constructor.name==="LoopLine"){const{node:s}=this.selectedObject,o=c({x:s.x,y:s.y},{x:t,y:i});this.draggedObject.angle=o}}}handleMouseUp(e){const{offsetX:t,offsetY:i}=e,s=this.getObjectByCoordinate({x:t,y:i});if(this.placeholderLine){if(s&&s.constructor.name==="Node"){let o;s===this.selectedObject?o=this.createLoopLine({node:s,cursorCoordinate:{x:t,y:i},isPlaceholderLine:!1}):o=this.createLine({sourceNode:this.placeholderLine.sourceNode,targetNode:s,lineOffset:s.radius}),this.objects[o.hitColor]=o}this.placeholderLine=null}this.draggedObject=null,this.isMouseDown=!1}handleDoubleClick(e){const{offsetX:t,offsetY:i}=e;if(this.getObjectByCoordinate({x:t,y:i}))return;const o=this.createNode({x:t,y:i});this.objects[o.hitColor]=o}draw(){this.ctx.save(),this.ctx.fillStyle="#ffffff",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.ctx.restore(),this.placeholderLine&&this.placeholderLine.draw();for(const e in this.objects)this.objects[e].draw()}get selectedObject(){return Object.values(this.objects).find(e=>e.isSelected)}get hitDetectionColor(){let e;do e=g();while(this.objects[e]);return e}getObjectByCoordinate({x:e,y:t}){const i=this.hitCanvasCtx.getImageData(e,t,1,1),[s,o,h]=i.data,r=`rgb(${s}, ${o}, ${h})`;return this.objects[r]}deleteObject(){this.selectedObject.constructor.name==="Node"&&(Object.entries(this.objects).filter(([e,t])=>t.constructor.name==="Line"&&(t.sourceNode===this.selectedObject||t.targetNode===this.selectedObject)).forEach(([e])=>delete this.objects[e]),Object.entries(this.objects).filter(([e,t])=>t.constructor.name==="LoopLine"&&t.node===this.selectedObject).forEach(([e])=>delete this.objects[e])),delete this.objects[this.selectedObject.hitColor]}exportToPNG(){const e=this.canvas.toDataURL("image/png"),t=document.createElement("a");t.download="design.png",t.href=e,t.click(),t.remove()}createNode({x:e,y:t}){const i=this.hitDetectionColor,{ctx:s,hitCanvasCtx:o}=this;return new b({x:e,y:t,ctx:s,hitCtx:o,hitColor:i})}createLine({sourceNode:e,targetNode:t,isPlaceholderLine:i=!1,lineOffset:s=null}){const o=this.hitDetectionColor;return new C({sourceNode:e,targetNode:t,isPlaceholderLine:i,lineOffset:s,ctx:this.ctx,hitCtx:this.hitCanvasCtx,hitColor:o})}createLoopLine({node:e,cursorCoordinate:t,isPlaceholderLine:i}){const s=c(e,t),o=this.hitDetectionColor;return new L({angle:s,node:e,isPlaceholderLine:i,ctx:this.ctx,hitCtx:this.hitCanvasCtx,hitColor:o})}render(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.hitCanvasCtx.clearRect(0,0,this.hitCanvas.width,this.hitCanvas.height),this.draw(),setTimeout(this.render.bind(this),10)}}const v=document.querySelector("#btn-export"),w=document.querySelector("#canvas"),d=new p({canvas:w});d.init();v.addEventListener("click",()=>d.exportToPNG());
