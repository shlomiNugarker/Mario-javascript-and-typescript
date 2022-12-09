(()=>{"use strict";class t{constructor(t,e,s,i,h,a,r,n=0,m=0,g=0){this.game=t,this.width=e,this.height=s,this.speedModifier=i,this.image=h,this.x=n,this.y=m,this.frameX=a,this.frameY=r,this.maxFrame=g}update(){}draw(t){const e=this.game.width/this.width,s=this.game.height/this.height;for(let i=0;i<e;i++)for(let e=0;e<s;e++)t.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x+i*this.width,this.y+e*this.height,this.width,this.height)}}class e{constructor(e){this.game=e,this.tiles=document.getElementById("tiles"),this.sky=new t(this.game,16,16,0,this.tiles,10,7),this.backgroundLayers=[this.sky]}update(){this.backgroundLayers.forEach((t=>{t.update()}))}draw(t){this.backgroundLayers.forEach((e=>{e.draw(t)}))}}class s{constructor(t){this.keys=[],this.game=t,window.addEventListener("keydown",(t=>{"ArrowDown"!==t.key&&"ArrowUp"!==t.key&&"ArrowLeft"!==t.key&&"ArrowRight"!==t.key&&"ArrowEnter"!==t.key&&" "!==t.key&&"Enter"!==t.key||-1!==this.keys.indexOf(t.key)||this.keys.push(t.key)})),window.addEventListener("keyup",(t=>{"ArrowDown"!==t.key&&"ArrowUp"!==t.key&&"ArrowLeft"!==t.key&&"ArrowRight"!==t.key&&"ArrowEnter"!==t.key&&" "!==t.key&&"Enter"!==t.key||this.keys.splice(this.keys.indexOf(t.key),1)}))}}var i;!function(t){t[t.STANDING=0]="STANDING",t[t.RUNNING=1]="RUNNING",t[t.JUMPING=2]="JUMPING",t[t.FALLING=3]="FALLING",t[t.DIVING=4]="DIVING"}(i||(i={}));class h{constructor(t,e){this.state=t,this.game=e}}class a extends h{constructor(t){super("STANDING",t)}enter(){this.game.player.frameX=0,this.game.player.maxFrame=0,this.game.player.frameY=5.5}handleInput(t){t.includes("ArrowLeft")||t.includes("ArrowRight")?this.game.player.setState(i.RUNNING,1):t.includes("ArrowUp")?this.game.player.setState(i.JUMPING,1):t.includes("Enter")}}class r extends h{constructor(t){super("RUNNING",t)}enter(){this.game.player.frameX=0,this.game.player.maxFrame=3,this.game.player.frameY=5.5}handleInput(t){!t.includes("ArrowDown")||t.includes("ArrowLeft")||t.includes("ArrowRight")?t.includes("ArrowUp")?this.game.player.setState(i.JUMPING,1):t.includes("Enter")||t.length||this.game.player.setState(i.STANDING,0):this.game.player.setState(i.STANDING,0)}}class n extends h{constructor(t){super("JUMPING",t)}enter(){this.game.player.isOnGround()&&(this.game.player.vy-=20),this.game.player.frameX=5,this.game.player.maxFrame=0,this.game.player.frameY=5.5}handleInput(t){this.game.player.vy>this.game.player.weight||!this.game.input.keys.includes("ArrowUp")?this.game.player.setState(i.FALLING,5):t.includes("Enter")||t.includes("ArrowDown")&&this.game.player.setState(i.DIVING,0)}}class m extends h{constructor(t){super("FALLING",t)}enter(){this.game.player.frameX=5,this.game.player.maxFrame=0,this.game.player.frameY=5.5}handleInput(t){this.game.player.isOnGround()?this.game.player.setState(i.RUNNING,1):t.includes("ArrowDown")&&this.game.player.setState(i.DIVING,0)}}class g extends h{constructor(t){super("DIVING",t)}enter(){this.game.player.frameX=0,this.game.player.maxFrame=0,this.game.player.frameY=5.5}handleInput(t){this.game.player.isOnGround()?this.game.player.setState(i.RUNNING,1):t.includes("Enter")&&this.game.player.isOnGround()}}class d{constructor(t){this.game=t,this.width=16,this.height=16,this.x=0,this.y=this.game.height-2*this.height,this.vy=0,this.weight=1,this.speed=0,this.maxSpeed=9,this.image=document.getElementById("sprite"),this.frameX=0,this.frameY=5.5,this.maxFrame=0,this.fps=20,this.frameInterval=1e3/this.fps,this.frameTimer=0,this.states=[new a(this.game),new r(this.game),new n(this.game),new m(this.game),new g(this.game)],this.currentState=this.states[0]}update(t,e){this.currentState.handleInput(t),this.x+=this.speed,t.includes("ArrowRight")&&this.currentState!==this.states[4]?(this.speed=this.maxSpeed,this.game.screenX-=this.maxSpeed):t.includes("ArrowLeft")&&this.currentState!==this.states[4]?(this.game.screenX>=0&&(this.game.screenX=0),this.speed=-this.maxSpeed,this.game.screenX+=this.maxSpeed):this.speed=0,this.x<0&&(this.x=0),this.x>this.game.width/2&&(this.x=this.game.width/2),this.y>this.game.height-this.height&&(this.y=this.game.height-this.height),this.y+=this.vy,this.isOnGround()?this.vy=0:this.vy+=this.weight,this.y>this.game.height-this.height&&(this.y=this.game.height-this.height),this.handleSpriteAnimation(e)}draw(t){t.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x,this.y,2*this.width,2*this.height)}isOnGround(){return this.y>=this.game.height-2*this.height}handleSpriteAnimation(t){this.frameTimer>this.frameInterval?(this.frameTimer=0,this.frameX<this.maxFrame?this.frameX++:this.currentState instanceof n||this.currentState instanceof m?this.frameX=5:this.frameX=0):this.frameTimer+=t}setState(t,e){this.currentState=this.states[t],this.currentState.enter()}}const c=document.getElementById("canvas"),y=c.getContext("2d");c.width=900,c.height=500;const l=new class{constructor(t,i){this.width=t,this.height=i,this.time=0,this.speed=0,this.background=new e(this),this.player=new d(this),this.input=new s(this),this.screenX=0}update(t){this.time+=t,this.player.update(this.input.keys,t)}draw(t){this.background.draw(t),this.player.draw(t)}}(c.width,c.height);let o=0;!function t(e){const s=e-o;o=e,y.clearRect(0,0,c.width,c.height),l.update(s),l.draw(y),requestAnimationFrame(t)}(0)})();