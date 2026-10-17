// Detecta faixa branca uniforme na borda direita das páginas de site.
import sharp from "sharp"; import fs from "node:fs";
const idx = JSON.parse(fs.readFileSync("src/data/assets.json","utf8"));
for (const [slug, v] of Object.entries(idx)) for (const it of v.items.filter(i=>i.kind==="page")) {
  const { data, info } = await sharp("public"+it.src,{limitInputPixels:false}).resize({width:360}).raw().toBuffer({resolveWithObject:true});
  const W=info.width,H=info.height,C=info.channels;
  const colWhite=(x)=>{let n=0;for(let y=0;y<H;y+=3){const i=(y*W+x)*C; if(data[i]>246&&data[i+1]>246&&data[i+2]>246)n++;} return n/Math.ceil(H/3);};
  let strip=0; for(let x=W-1;x>W*0.85;x--){ if(colWhite(x)>0.995) strip++; else break; }
  const left=colWhite(0);
  if (strip>1) console.log(slug, it.id, "strip px(360w):", strip, "leftWhite:", left.toFixed(2));
}
