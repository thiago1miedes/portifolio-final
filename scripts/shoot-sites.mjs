// usage: node shoot.mjs <outDir> name=url ...
import puppeteer from "puppeteer-core";
import sharp from "sharp";
import fs from "fs"; import path from "path";
const [out, ...pairs] = process.argv.slice(2);
fs.mkdirSync(out,{recursive:true});
const browser = await puppeteer.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe", headless:true, args:["--hide-scrollbars","--no-first-run"]});
for (const p of pairs){
  const [name, url] = p.split(/=(.+)/);
  for (const vp of [{tag:"desktop",w:1440,h:900,m:false},{tag:"mobile",w:390,h:844,m:true}]){
    const page = await browser.newPage();
    try{
      await page.setViewport({width:vp.w,height:vp.h,deviceScaleFactor: vp.m?2:1, isMobile:vp.m, hasTouch:vp.m});
      await page.goto(url,{waitUntil:"networkidle2",timeout:60000});
      // scroll to trigger lazy/animations
      await page.evaluate(async()=>{ await new Promise(r=>{let y=0;const t=setInterval(()=>{window.scrollBy(0,500);y+=500;if(y>document.body.scrollHeight){clearInterval(t);r();}},120);}); window.scrollTo(0,0); });
      await new Promise(r=>setTimeout(r,2500));
      // reveal anything left hidden by scroll animations
      await page.addStyleTag({content:"*{animation-play-state:paused!important} [data-aos],.aos-init,.wow,.reveal,[class*='fade']{opacity:1!important;transform:none!important;visibility:visible!important}"});
      const buf = await page.screenshot({fullPage:true, type:"png", captureBeyondViewport:true});
      const img = sharp(buf,{limitInputPixels:false});
      const meta = await img.metadata();
      await img.webp({quality:80}).toFile(path.join(out,`${name}-${vp.tag}.webp`));
      await sharp(buf,{limitInputPixels:false}).resize({width:360}).jpeg({quality:65}).toFile(path.join(out,`${name}-${vp.tag}-preview.jpg`));
      console.log(name, vp.tag, meta.width+"x"+meta.height);
    }catch(e){ console.log("ERR", name, vp.tag, e.message); }
    await page.close();
  }
}
await browser.close();
