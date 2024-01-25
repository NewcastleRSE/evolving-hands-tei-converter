(function(g){typeof define=="function"&&define.amd?define(g):g()})(function(){"use strict";var g=document.createElement("style");g.textContent=`[lang=ar],[lang=ota],[lang=fa],[lang=he],[lang*=-Arab-AR]{direction:rtl;text-align:right}[lang=en],[lang=fr],[lang=de],[lang=it],[lang*=ar-Latn-],[lang*=ota-Latn-]{direction:ltr;text-align:left}tei-choice tei-abbr+tei-expan:before,tei-choice tei-expan+tei-abbr:before,tei-choice tei-sic+tei-corr:before,tei-choice tei-corr+tei-sic:before,tei-choice tei-orig+tei-reg:before,tei-choice tei-reg+tei-orig:before{content:" ("}tei-choice tei-abbr+tei-expan:after,tei-choice tei-expan+tei-abbr:after,tei-choice tei-sic+tei-corr:after,tei-choice tei-corr+tei-sic:after,tei-choice tei-orig+tei-reg:after,tei-choice tei-reg+tei-orig:after{content:")"}tei-ab{display:block;margin-top:1em;margin-bottom:1em}tei-accMat{display:block}tei-accMat:before{content:"accompanying materials: "}tei-acquisition{display:block;margin-top:0;margin-bottom:0}tei-acquisition:before{font-weight:700;content:"acquisition"}tei-activity{display:block}tei-activity:before{content:"activity: "}tei-add[place=above]{vertical-align:super}tei-add[place=inline]:before{content:"«"}tei-add[place=inline]:after{content:"»"}tei-add[place=below]{vertical-align:sub}tei-additional{display:block}tei-additions{display:block}tei-additions:before{content:"Significant additions within the document: "}tei-addrLine{display:block}tei-address[data-tei-rend~=block],addresss[data-tei-rendition~="#block"]{display:block}tei-adminInfo{display:block}tei-app tei-note{display:none}tei-appInfo{display:block}tei-appInfo:before{content:"Application information: "}tei-application{display:block}tei-application:after{content:" " attr(version)}tei-argument{display:block}tei-att{font-family:Courier,monospace}tei-att:before{content:"@"}tei-titlestmt>tei-author{display:block;margin-bottom:1em}tei-publicationstmt>tei-availability{font-size:80%}tei-publicationstmt>tei-availability:before{font-weight:700;content:"Availability: "}tei-publicationstmt>tei-availability[data-tei-status]:before{font-weight:700;content:"Availability (" attr(status) "): "}tei-back{display:block}tei-bibl[data-tei-rend~=block],bibl[data-tei-rendition~="#block"]{display:block;padding-left:2em;text-indent:-2em}tei-biblFull{display:block}tei-binding{display:block}tei-binding:before{content:"Binding: \\a";white-space:pre-wrap}tei-binding[data-tei-contemporary]:before{content:"Binding: \\a" "Contemporary: " attr(contemporary) "\\a";white-space:pre-wrap}tei-bindingdesc{display:block}tei-bindngdesc:before{content:"Binding description: \\a"}tei-birth{display:block}tei-birth:before{content:"Birth: "}tei-cRefPattern{display:none}tei-caption{display:block;margin-top:1em;margin-bottom:1em}tei-case[data-tei-value]:before{font-weight:700;content:attr(value) " "}tei-castgroup{display:block;margin-top:1em;margin-bottom:1em}tei-castitem{display:list-item}tei-castlist{display:block;list-style-type:none;margin-top:1em;margin-bottom:1em;margin-left:2em}tei-cb{display:block;margin-top:1em;margin-bottom:1em}tei-cb:before{content:"[column break]"}tei-cell{border-right:thin solid black;border-bottom:thin solid black;padding:2px}tei-cell[data-tei-role=label]{font-weight:700}tei-climate{display:block;margin-top:1em;margin-bottom:1em}tei-climate:before{font-weight:700;content:"Climate: "}tei-code{font-family:Courier,monospace}tei-collation{display:block;margin-top:1em;margin-bottom:1em}tei-condition{display:block;margin-top:1em;margin-bottom:1em}tei-constitution{display:block;margin-top:1em;margin-bottom:1em}tei-constitution:before{font-weight:700;content:"Constitution: "}tei-constitution[data-tei-type]{display:block;margin-top:1em;margin-bottom:1em}tei-constitution[data-tei-type]:before{font-weight:700;content:"Constitution (" attr(type) "): "}tei-constitution[data-tei-type=frags]{display:block;margin-top:1em;margin-bottom:1em}tei-constitution[data-tei-type=frags]:before{font-weight:700;content:"Constitution (fragments): "}tei-custevent{display:list-item}tei-custodialhist{display:block;margin-top:1em;margin-bottom:1em}tei-date[data-tei-when]:empty:before{content:attr(when)}tei-editionstmt{display:block}teieg-egxml{display:block;font-size:80%;margin-left:1em;padding-left:1em;border-left:1px solid #aaaaaa;margin-top:.75em;margin-bottom:.75em;padding-top:.75em;padding-bottom:.75em;font-family:monospace;white-space:pre}tei-emph{font-style:italic}tei-encodingdesc{display:none}tei-epigraph{display:block;margin-top:1em;margin-bottom:1em}tei-explicit{font-style:italic}tei-filedesc>tei-extent{display:none}tei-figure{display:block;text-align:center;margin-left:auto;margin-right:auto}tei-gap[data-tei-reason=lost]:before{content:"["}tei-gap[data-tei-reason=lost]:after{content:attr(data-content) "]"}tei-gap[data-tei-reason=illegible]:after{content:attr(data-content)}tei-gi{font-family:Courier,monospace}tei-gi:before{content:"<"}tei-gi:after{content:">"}tei-head{display:block;font-family:Arvo,sans-serif;font-weight:400}tei-body>tei-head{font-size:180%;text-indent:-.5em}tei-div.textpart{display:none}tei-div>tei-head{font-size:170%;text-indent:-.5em}tei-div>tei-div>tei-head{font-size:155%}tei-div>tei-div>tei-div>tei-head{font-size:140%}tei-div>tei-div>tei-div>tei-div>tei-head,list>tei-head{font-size:130%}tei-div>tei-div>tei-div>tei-div>tei-div>tei-head{font-size:120%}tei-div>tei-div>tei-div>tei-div>tei-div>tei-div tei-head{font-size:110%}tei-figure>tei-head{display:block;margin:1.5em auto;padding:.5em 1.5em 1.5em;border:1px solid black;border-radius:15px;width:325px;position:relative;border:1px solid #aaaaaa;background:#fafafa;text-indent:0;font-size:85%;text-align:justify;-webkit-box-shadow:0px 1px 3px rgba(0,0,0,.25);-moz-box-shadow:0px 1px 3px rgba(0,0,0,.25);box-shadow:0 1px 3px #00000040;width:85%;font-family:Georgia,Serif;font-size:13pt}tei-hi[rend~=caps]{font-weight:700}tei-hi[rend~=italic]{font-style:italic}tei-hi[rend~=underline]{text-decoration:underline}tei-ident{font-family:Courier,monospace}tei-incipit{font-style:italic}tei-item{display:list-item;margin-left:1em}tei-cell item{margin-left:1em}tei-l{display:block;width:35em}tei-l[data-lineno]:before{content:attr(data-lineno);position:absolute;left:2em}tei-lb:after{content:"\\a";white-space:pre}tei-lg{display:block;margin-top:1em;margin-bottom:1em}tei-list{display:block;margin-top:1em;margin-bottom:1em;list-style-type:none}tei-item>tei-list{margin-top:0}tei-sourcedesc tei-list{list-style-type:none}tei-sourcedesc>tei-list>tei-head{font-size:140%;font-weight:700}tei-sourcedesc tei-list>tei-item{display:list-item}tei-text tei-list[type=simple]{list-style-type:none}tei-text tei-list[type=bulleted]{list-style-type:disc}tei-text tei-list[type=ordered]{list-style-type:none;counter-reset:items 0}tei-text tei-list[type=ordered]>tei-item{display:list-item;margin-left:0}tei-text tei-list[type=ordered]>item:before{counter-increment:items 1;content:counter(items,decimal) ". "}tei-text tei-list[type=gloss]{list-style-type:none}tei-list[type=gloss]>tei-label{display:block;margin-top:.25em;margin-bottom:.25em;font-weight:700}tei-list[type=gloss]>tei-item{margin-left:2em}tei-item>tei-list[type=ordered]{margin-left:1em}tei-listapp{display:block;margin:1em;padding:1em}tei-listbibl{display:block;list-style-type:none;margin-left:.5 em;margin-top:.5em}tei-listbibl>tei-head{font-size:120%;font-weight:700}tei-listbibl>tei-bibl{display:list-item;margin-left:.5em}tei-listwit{display:block;list-style-type:none;margin-left:.5em}tei-listwit>tei-head{font-size:120%;font-weight:700}tei-listwit>tei-witness{display:list-item;margin-left:2em;text-indent:-1.1em}tei-witness>tei-listwit{display:inline}tei-witness>tei-listwit>tei-head{display:inline}tei-witness>tei-listwit>tei-witness{display:inline}tei-locus{display:none}tei-milestone{display:none;margin-left:auto;margin-right:auto;text-align:center}tei-musicNotation{font-weight:700}tei-musicNotation:before{font-weight:700;content:"Musical Notation: "}tei-node{display:none}tei-notesstmt{display:none}tei-ovar{font-style:italic}tei-origPlace{font-weight:700}tei-origPlace:before{font-weight:700;content:"Place of Origin: "}tei-p{display:block;margin-top:1em;margin-bottom:1em;text-align:justify}*[data-tei-rendition~="#center"] p{text-align:center}tei-availability>p:first-child{margin-top:0}tei-performance{display:block;margin-top:1em;margin-bottom:1em}tei-person{display:block;margin-top:1em;margin-bottom:1em}tei-personGrp{display:block;margin-top:1em;margin-bottom:1em}tei-postscript{display:block;margin-top:2em}tei-principal{font-weight:700}tei-principal:before{font-weight:700;content:"Principal: "}tei-profiledesc{display:none}tei-publicationstmt>*{display:none}tei-publicationstmt{display:block;margin-top:1em;margin-bottom:1em}tei-publicationstmt>date{display:none}tei-publicationstmt>publisher{display:none}tei-q{quotes:"“" "”" "‘" "’" "“" "”" "‘" "’" "“" "”" "‘" "’" "“" "”"}tei-q:before{content:""}tei-q:after{content:""}tei-q[data-tei-next]:after{content:""!important}tei-q[data-tei-prev]:before{content:""!important}tei-quote{font-style:italic}tei-app tei-rdg{display:none}tei-re{display:block;margin-top:0;margin-bottom:0}tei-recordhist{display:block;margin-top:1em;margin-bottom:1em}tei-ref{color:#5f0000;text-decoration:underline;cursor:pointer}tei-remarks{font-weight:700}tei-remarks:before{font-weight:700;content:"remarks: "}tei-respstmt{display:block;margin-top:0;margin-bottom:0}tei-revisiondesc{display:none}tei-row{display:grid;grid-auto-flow:column;grid-auto-columns:1fr}tei-salute{display:block;margin-top:1em;margin-bottom:1em}tei-samplingdecl{display:block;margin-top:0;margin-bottom:0}tei-scriptnote{display:block;margin-top:1em;margin-bottom:1em}tei-seal{display:block;margin-top:0;margin-bottom:0}tei-seal:before{font-weight:700;content:"Seal: "}tei-sealdesc{display:block;margin-top:1em;margin-bottom:1em}tei-secFol:before{font-weight:700;content:"Second Folio: "}tei-secl>*:first-child:before{content:"\\a[";white-space:pre}tei-secl>*:last-child:after{content:"]\\a\\a";white-space:pre}tei-seg{outline:0px solid transparent}tei-sense{display:block;margin-top:0;margin-bottom:0}tei-seriesstmt{display:none}tei-setting{display:block;margin-top:0;margin-bottom:0}tei-signed{display:block;margin-top:2em}tei-soCalled{quotes:"“" "”" "‘" "’" "“" "”" "‘" "’" "“" "”" "‘" "’" "“" "”"}tei-soCalled:before{content:open-quote}tei-soCalled:after{content:close-quote}tei-soCalled[data-tei-next]:after{content:""!important}tei-soCalled[data-tei-prev]:before{content:""!important}tei-sound{font-style:italic}tei-source{display:block;margin-top:0;margin-bottom:0}tei-sourcedesc{display:none}tei-space:before{font-weight:700;content:""}tei-span[data-tei-data-n]:before{content:attr(data-n)}tei-speaker{font-weight:700;margin-right:0}tei-sponsor{display:block;margin-top:0;margin-bottom:0}tei-sponsor:before{font-weight:700;content:"Sponsor:"}tei-stage{display:block;margin-top:1em;margin-bottom:1em;font-style:italic}tei-stamp{display:block;margin-top:1em;margin-bottom:1em}tei-stamp:before{font-weight:700;content:"Stamped: "}tei-surplus>*:first-child:before{content:"\\a[";white-space:pre}tei-surplus>*:last-child:after{content:"]\\a\\a";white-space:pre}tei-tei{display:block}tei-table{display:block;border-top:thin solid black;border-left:thin solid black}tei-table{margin-top:2em;margin-bottom:2em;font-size:12pt}tei-table>tei-head{border-bottom:thin solid black;border-right:thin solid black;font-size:120%;font-weight:700;padding:2px;text-align:center}tei-teiheader{display:block;margin-top:2em;margin-bottom:2em}tei-tei>tei-text{display:block;line-height:1.5}tei-textclass{display:none}tei-textdesc{display:none}tei-tei tei-title{display:inline}tei-tei tei-title[level=a]{quotes:"“" "”" "‘" "’" "“" "”" "‘" "’" "“" "”" "‘" "’" "“" "”"}tei-tei tei-title[level=a]:before{content:open-quote}tei-tei tei-title[level=a]:after{content:close-quote}tei-tei tei-title[level=a][next]:after{content:""!important}tei-tei tei-title[level=a][prev]:before{content:""!important}tei-title[level=m]{font-style:italic}tei-titlestmt>tei-title{display:block;font-family:Arvo,sans-serif;font-weight:400;font-weight:700!important;font-size:150%}tei-typedesc{display:none}tei-u:before{content:"-"}tei-view{font-style:italic}tei-wit{display:inline}tei-witdetail{display:none}
`,document.head.appendChild(g);function b(){}function B(e){return e()}function q(){return Object.create(null)}function A(e){e.forEach(B)}function z(e){return typeof e=="function"}function X(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function Y(e){return Object.keys(e).length===0}function K(e,t){e.appendChild(t)}function T(e,t,i){e.insertBefore(t,i||null)}function x(e){e.parentNode&&e.parentNode.removeChild(e)}function I(e){return document.createElement(e)}function Q(e){return document.createTextNode(e)}function k(e,t,i){i==null?e.removeAttribute(t):e.getAttribute(t)!==i&&e.setAttribute(t,i)}function tt(e){return Array.from(e.childNodes)}function et(e,t){t=""+t,e.data!==t&&(e.data=t)}function it(e){const t={};return e.childNodes.forEach(i=>{t[i.slot||"default"]=!0}),t}let y;function $(e){y=e}function nt(){if(!y)throw new Error("Function called outside component initialization");return y}function ot(e){nt().$$.on_mount.push(e)}const p=[],R=[];let u=[];const D=[],at=Promise.resolve();let L=!1;function rt(){L||(L=!0,at.then(H))}function M(e){u.push(e)}const S=new Set;let m=0;function H(){if(m!==0)return;const e=y;do{try{for(;m<p.length;){const t=p[m];m++,$(t),st(t.$$)}}catch(t){throw p.length=0,m=0,t}for($(null),p.length=0,m=0;R.length;)R.pop()();for(let t=0;t<u.length;t+=1){const i=u[t];S.has(i)||(S.add(i),i())}u.length=0}while(p.length);for(;D.length;)D.pop()();L=!1,S.clear(),$(e)}function st(e){if(e.fragment!==null){e.update(),A(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(M)}}function lt(e){const t=[],i=[];u.forEach(n=>e.indexOf(n)===-1?t.push(n):i.push(n)),i.forEach(n=>n()),u=t}const ct=new Set;function dt(e,t){e&&e.i&&(ct.delete(e),e.i(t))}function ft(e,t,i){const{fragment:n,after_update:o}=e.$$;n&&n.m(t,i),M(()=>{const a=e.$$.on_mount.map(B).filter(z);e.$$.on_destroy?e.$$.on_destroy.push(...a):A(a),e.$$.on_mount=[]}),o.forEach(M)}function pt(e,t){const i=e.$$;i.fragment!==null&&(lt(i.after_update),A(i.on_destroy),i.fragment&&i.fragment.d(t),i.on_destroy=i.fragment=null,i.ctx=[])}function ut(e,t){e.$$.dirty[0]===-1&&(p.push(e),rt(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function mt(e,t,i,n,o,a,s=null,r=[-1]){const l=y;$(e);const c=e.$$={fragment:null,ctx:[],props:a,update:b,not_equal:o,bound:q(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(l?l.$$.context:[])),callbacks:q(),dirty:r,skip_bound:!1,root:t.target||l.$$.root};s&&s(c.root);let C=!1;if(c.ctx=i?i(e,t.props||{},(d,w,...f)=>{const N=f.length?f[0]:w;return c.ctx&&o(c.ctx[d],c.ctx[d]=N)&&(!c.skip_bound&&c.bound[d]&&c.bound[d](N),C&&ut(e,d)),w}):[],c.update(),C=!0,A(c.before_update),c.fragment=n?n(c.ctx):!1,t.target){if(t.hydrate){const d=tt(t.target);c.fragment&&c.fragment.l(d),d.forEach(x)}else c.fragment&&c.fragment.c();t.intro&&dt(e.$$.fragment),ft(e,t.target,t.anchor),H()}$(l)}let U;typeof HTMLElement=="function"&&(U=class extends HTMLElement{$$ctor;$$s;$$c;$$cn=!1;$$d={};$$r=!1;$$p_d={};$$l={};$$l_u=new Map;constructor(e,t,i){super(),this.$$ctor=e,this.$$s=t,i&&this.attachShadow({mode:"open"})}addEventListener(e,t,i){if(this.$$l[e]=this.$$l[e]||[],this.$$l[e].push(t),this.$$c){const n=this.$$c.$on(e,t);this.$$l_u.set(t,n)}super.addEventListener(e,t,i)}removeEventListener(e,t,i){if(super.removeEventListener(e,t,i),this.$$c){const n=this.$$l_u.get(t);n&&(n(),this.$$l_u.delete(t))}}async connectedCallback(){if(this.$$cn=!0,!this.$$c){let e=function(o){return()=>{let a;return{c:function(){a=I("slot"),o!=="default"&&k(a,"name",o)},m:function(l,c){T(l,a,c)},d:function(l){l&&x(a)}}}};if(await Promise.resolve(),!this.$$cn)return;const t={},i=it(this);for(const o of this.$$s)o in i&&(t[o]=[e(o)]);for(const o of this.attributes){const a=this.$$g_p(o.name);a in this.$$d||(this.$$d[a]=v(a,o.value,this.$$p_d,"toProp"))}for(const o in this.$$p_d)!(o in this.$$d)&&this[o]!==void 0&&(this.$$d[o]=this[o],delete this[o]);this.$$c=new this.$$ctor({target:this.shadowRoot||this,props:{...this.$$d,$$slots:t,$$scope:{ctx:[]}}});const n=()=>{this.$$r=!0;for(const o in this.$$p_d)if(this.$$d[o]=this.$$c.$$.ctx[this.$$c.$$.props[o]],this.$$p_d[o].reflect){const a=v(o,this.$$d[o],this.$$p_d,"toAttribute");a==null?this.removeAttribute(this.$$p_d[o].attribute||o):this.setAttribute(this.$$p_d[o].attribute||o,a)}this.$$r=!1};this.$$c.$$.after_update.push(n),n();for(const o in this.$$l)for(const a of this.$$l[o]){const s=this.$$c.$on(o,a);this.$$l_u.set(a,s)}this.$$l={}}}attributeChangedCallback(e,t,i){this.$$r||(e=this.$$g_p(e),this.$$d[e]=v(e,i,this.$$p_d,"toProp"),this.$$c?.$set({[e]:this.$$d[e]}))}disconnectedCallback(){this.$$cn=!1,Promise.resolve().then(()=>{this.$$cn||(this.$$c.$destroy(),this.$$c=void 0)})}$$g_p(e){return Object.keys(this.$$p_d).find(t=>this.$$p_d[t].attribute===e||!this.$$p_d[t].attribute&&t.toLowerCase()===e)||e}});function v(e,t,i,n){const o=i[e]?.type;if(t=o==="Boolean"&&typeof t!="boolean"?t!=null:t,!n||!i[e])return t;if(n==="toAttribute")switch(o){case"Object":case"Array":return t==null?null:JSON.stringify(t);case"Boolean":return t?"":null;case"Number":return t??null;default:return t}else switch(o){case"Object":case"Array":return t&&JSON.parse(t);case"Boolean":return t;case"Number":return t!=null?+t:t;default:return t}}function ht(e,t,i,n,o,a){let s=class extends U{constructor(){super(e,i,o),this.$$p_d=t}static get observedAttributes(){return Object.keys(t).map(r=>(t[r].attribute||r).toLowerCase())}};return Object.keys(t).forEach(r=>{Object.defineProperty(s.prototype,r,{get(){return this.$$c&&r in this.$$c?this.$$c[r]:this.$$d[r]},set(l){l=v(r,l,t),this.$$d[r]=l,this.$$c?.$set({[r]:l})}})}),n.forEach(r=>{Object.defineProperty(s.prototype,r,{get(){return this.$$c?.[r]}})}),a&&(s=a(s)),e.element=s,s}class gt{$$=void 0;$$set=void 0;$destroy(){pt(this,1),this.$destroy=b}$on(t,i){if(!z(i))return b;const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(i),()=>{const o=n.indexOf(i);o!==-1&&n.splice(o,1)}}$set(t){this.$$set&&!Y(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const bt="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(bt);const yt={namespaces:{tei:"http://www.tei-c.org/ns/1.0",teieg:"http://www.tei-c.org/ns/Examples",rng:"http://relaxng.org/ns/structure/1.0"},tei:{eg:["<pre>","</pre>"],ptr:['<a href="$rw@target">$@target</a>'],ref:[["[target]",['<a href="$rw@target">',"</a>"]]],graphic:function(e){let t=new Image;return t.src=this.rw(e.getAttribute("url")),e.hasAttribute("width")&&t.setAttribute("width",e.getAttribute("width")),e.hasAttribute("height")&&t.setAttribute("height",e.getAttribute("height")),t},list:[["[type=gloss]",function(e){const t=e.ownerDocument;let i=t.createElement("dl");for(let n of Array.from(e.children))if(n.nodeType==1){if(n.localName=="tei-label"){let o=t.createElement("dt");o.innerHTML=n.innerHTML,i.appendChild(o)}if(n.localName=="tei-item"){let o=t.createElement("dd");o.innerHTML=n.innerHTML,i.appendChild(o)}}return i}]],note:[["[place=end]",function(e){const t=e.ownerDocument;this.noteIndex?this.noteIndex++:this.noteIndex=1;let i="_note_"+this.noteIndex,n=t.createElement("a");n.setAttribute("id","src"+i),n.setAttribute("href","#"+i),n.innerHTML=this.noteIndex;let o=t.createElement("sup");o.appendChild(n);let a=t.querySelector("ol.notes");a||(a=t.createElement("ol"),a.setAttribute("class","notes"),this.dom.appendChild(a));let s=t.createElement("li");return s.id=i,s.innerHTML=e.innerHTML,a.appendChild(s),o}],["_",["(",")"]]],teiHeader:function(e){this.hideContent(e,!1)},title:[["tei-titlestmt>tei-title",function(e){const t=e.ownerDocument;let i=t.createElement("title");i.innerHTML=e.innerText,t.querySelector("head").appendChild(i)}]]},teieg:{egXML:function(e){let i=e.ownerDocument.createElement("pre"),n=this.serialize(e,!0).replace(/</g,"&lt;"),o=n.match(/^[\t ]+/);return o&&(n=n.replace(new RegExp("^"+o[0],"mg"),"")),i.innerHTML=n,i}}};function $t(e,t){let i=1,n=e;for(;n&&n.previousElementSibling!==null&&(!t||n.previousElementSibling.localName==t)&&(i++,n=n.previousElementSibling,!!n.previousElementSibling););return i}function wt(e){const t=e.ownerDocument;let i=n=>{let o=n.nodeType===1?t.createElement(n.nodeName):n.cloneNode(!0);if(n.attributes)for(let a of Array.from(n.attributes))a.name!=="data-processed"&&o.setAttribute(a.name,a.value);for(let a of Array.from(n.childNodes))if(a.nodeType==1){if(!n.hasAttribute("data-empty"))if(a.hasAttribute("data-original")){for(let s of Array.from(a.childNodes)){let r=o.appendChild(i(s));r.nodeType===1&&r.hasAttribute("data-origid")&&(r.setAttribute("id",r.getAttribute("data-origid")),r.removeAttribute("data-origid"))}return o}else o.appendChild(i(a))}else o.appendChild(a.cloneNode());return o};return i(e)}function At(e){return e.replace(/ .*$/,"")}function F(e,t=!0){const i=e.ownerDocument;if(e.childNodes.length>0){let n=i.createElement("span");e.appendChild(n),n.setAttribute("hidden",""),n.setAttribute("data-original","");for(let o of Array.from(e.childNodes))if(o!==n){if(o.nodeType===1){o.setAttribute("data-processed","");for(let a of o.querySelectorAll("*"))a.setAttribute("data-processed","")}n.appendChild(e.removeChild(o))}if(t)for(let o of Array.from(n.querySelectorAll("*")))o.hasAttribute("id")&&(o.setAttribute("data-origid",o.getAttribute("id")),o.removeAttribute("id"))}}function xt(e){return this.rw(this.first(e))}function kt(e,t){let i="";for(let n=0;n<t;n++)i+=e;return i}function vt(e){let t=this.prefixDefs[e.substring(0,e.indexOf(":"))];return e.replace(new RegExp(t.matchPattern),t.replacementPattern)}function Et(e){return this.prefixDefs[e]}function _t(e){return e.match(/^(?:http|mailto|file|\/|#).*$/)?e:this.base+this.utilities.first(e)}function P(e,t,i){let n="",o=a=>!/[^\t\n\r ]/.test(a);if(!t&&e.nodeType==1){typeof i=="string"&&i!==""?n+=`
`+i+"<":n+="<",n+=e.getAttribute("data-origname");let a=e.hasAttribute("data-origatts")?e.getAttribute("data-origatts").split(" "):[];for(let s of Array.from(e.attributes))!s.name.startsWith("data-")&&!["id","lang","class"].includes(s.name)&&(n+=" "+a.find(function(r){return r.toLowerCase()==s.name})+'="'+s.value+'"'),s.name=="data-xmlns"&&(n+=' xmlns="'+s.value+'"');e.childNodes.length>0?n+=">":n+="/>"}for(let a of Array.from(e.childNodes))switch(a.nodeType){case 1:typeof i=="string"?n+=P(a,!1,i+"  "):n+=P(a,!1,i);break;case 7:n+="<?"+a.nodeValue+"?>";break;case 8:n+="<!--"+a.nodeValue+"-->";break;default:if(t&&o(a.nodeValue)&&(n+=a.nodeValue.replace(/^\s*\n/,"")),typeof i=="string"&&o(a.nodeValue))break;n+=a.nodeValue}return!t&&e.childNodes.length>0&&(typeof i=="string"?n+=`
`+i+"</":n+="</",n+=e.getAttribute("data-origname")+">"),n}function Ct(e){return e.replace(/&gt;/,">").replace(/&quot;/,'"').replace(/&apos;/,"'").replace(/&amp;/,"&")}function E(e){return e.includes(":"),e.replace(/:/,"-").toLowerCase()}function V(e,t=null,i=!1){try{window.customElements.define(E(e),class extends HTMLElement{constructor(){super(),this.matches(":defined")||(t&&t.call(this),this.setAttribute("data-processed",""))}connectedCallback(){this.hasAttribute("data-processed")||(t&&t.call(this),this.setAttribute("data-processed",""))}})}catch(n){i&&(console.log(E(e)+" couldn't be registered or is already registered."),console.log(n))}}const O=Object.freeze(Object.defineProperty({__proto__:null,copyAndReset:wt,defineCustomElement:V,first:At,getOrdinality:$t,getPrefixDef:Et,hideContent:F,normalizeURI:xt,repeat:kt,resolveURI:vt,rw:_t,serialize:P,tagName:E,unEscapeEntities:Ct},Symbol.toStringTag,{value:"Module"}));function Nt(e){if(e.namespaces)for(let t of Object.keys(e.namespaces))!this.namespaces.has(e.namespaces[t])&&!Array.from(this.namespaces.values()).includes(t)&&this.namespaces.set(e.namespaces[t],t);for(let t of this.namespaces.values())if(e[t])for(let i of Object.keys(e[t]))this.behaviors[`${t}:${i}`]=e[t][i];if(e.functions)for(let t of Object.keys(e.functions))this.utilities[t]=e.functions[t];e.handlers&&console.log("Behavior handlers are no longer used."),e.fallbacks&&console.log("Fallback behaviors are no longer used.")}function Tt(e,t,i){let n;if(e===Object(e))for(let o of Object.keys(e))this.namespaces.has(e[o])||(this.namespaces.set(e[o],o),n=o);else n=e;this.behaviors[`${n}:${t}`]=i}function It(e,t){let i;if(e===Object(e))for(let n of Object.keys(e))this.namespaces.has(e[n])||(this.namespaces.set(e[n],n),i=n);else i=e;delete this.behaviors[`${i}:${t}`]}function Lt(e,t){const i=e.documentElement;let n=1,o=function(s){return t.has(s.namespaceURI?s.namespaceURI:"")||t.set(s.namespaceURI,"ns"+n++),t.get(s.namespaceURI?s.namespaceURI:"")+":"+s.localName};const a=new Set(Array.from(i.querySelectorAll("*"),o));return a.add(o(i)),a}function Mt(e){return Array.from(e.querySelectorAll("*[data-origname]"),t=>t.localName.replace(/(\w+)-.+/,"$1:")+t.getAttribute("data-origname"))}class h{constructor(t){this.options=t||{},this.document=this.options.documentObject?this.options.documentObject:void 0,this.document===void 0&&(typeof window<"u"&&window.document?this.document=window.document:typeof global<"u"&&global.document&&(this.document=global.document)),this.addBehaviors=Nt.bind(this),this.addBehavior=Tt.bind(this),this.removeBehavior=It.bind(this),this.utilities={};for(const i of Object.keys(O))["getPrefixDef","rw","resolveURI"].includes(i)?this.utilities[i]=O[i].bind(this):this.utilities[i]=O[i];if(this.els=[],this.namespaces=new Map,this.behaviors={},this.hasStyle=!1,this.prefixDefs=[],this.debug=this.options.debug===!0,this.discardContent=this.options.discardContent===!0,this.options.base)this.base=this.options.base;else try{window&&(this.base=window.location.href.replace(/\/[^\/]*$/,"/"))}catch{this.base=""}this.options.omitDefaultBehaviors||this.addBehaviors(yt),this.options.ignoreFragmentId&&window&&window.removeEventListener("ceteiceanload",h.restorePosition)}getHTML5(t,i,n){return window&&window.location.href.startsWith(this.base)&&t.indexOf("/")>=0&&(this.base=t.replace(/\/[^\/]*$/,"/")),new Promise(function(a,s){let r=new XMLHttpRequest;r.open("GET",t),r.send(),r.onload=function(){this.status>=200&&this.status<300?a(this.response):s(this.statusText)},r.onerror=function(){s(this.statusText)}}).catch(function(a){console.log("Could not get XML file."),this.debug&&console.log(a)}).then(a=>this.makeHTML5(a,i,n))}makeHTML5(t,i,n){return this.XML_dom=new DOMParser().parseFromString(t,"text/xml"),this.domToHTML5(this.XML_dom,i,n)}preprocess(t,i,n){this.els=Lt(t,this.namespaces);let o=a=>{let s;if(this.namespaces.has(a.namespaceURI?a.namespaceURI:"")){let r=this.namespaces.get(a.namespaceURI?a.namespaceURI:"");s=this.document.createElement(`${r}-${a.localName}`)}else s=this.document.importNode(a,!1);for(let r of Array.from(a.attributes))r.name=="xmlns"?s.setAttribute("data-xmlns",r.value):s.setAttribute(r.name,r.value),r.name=="xml:id"&&s.setAttribute("id",r.value),r.name=="xml:lang"&&s.setAttribute("lang",r.value),r.name=="rendition"&&s.setAttribute("class",r.value.replace(/#/g,""));if(s.setAttribute("data-origname",a.localName),a.hasAttributes()&&s.setAttribute("data-origatts",a.getAttributeNames().join(" ")),a.childNodes.length==0&&s.setAttribute("data-empty",""),a.localName=="head"){let r=t.evaluate("count(ancestor::*[tei:head])",a,function(l){if(l=="tei")return"http://www.tei-c.org/ns/1.0"},1,null);s.setAttribute("data-level",r.numberValue)}if(a.localName=="tagsDecl"){let r=this.document.createElement("style");for(let l of Array.from(a.childNodes))if(l.nodeType==1&&l.localName=="rendition"&&l.getAttribute("scheme")=="css"){let c="";l.hasAttribute("selector")?(c+=l.getAttribute("selector").replace(/([^#, >]+\w*)/g,"tei-$1").replace(/#tei-/g,"#")+`{
`,c+=l.textContent):(c+="."+l.getAttribute("xml:id")+`{
`,c+=l.textContent),c+=`
}
`,r.appendChild(this.document.createTextNode(c))}r.childNodes.length>0&&(s.appendChild(r),this.hasStyle=!0)}a.localName=="prefixDef"&&(this.prefixDefs.push(a.getAttribute("ident")),this.prefixDefs[a.getAttribute("ident")]={matchPattern:a.getAttribute("matchPattern"),replacementPattern:a.getAttribute("replacementPattern")});for(let r of Array.from(a.childNodes))r.nodeType==1?s.appendChild(o(r)):s.appendChild(r.cloneNode());return n&&n(s,a),s};if(this.dom=o(t.documentElement),this.utilities.dom=this.dom,i)i(this.dom,this),window&&window.dispatchEvent(_);else return typeof window<"u"&&window.dispatchEvent(_),this.dom}domToHTML5(t,i,n){if(this.preprocess(t,null,n),this.applyBehaviors(),this.done=!0,i)i(this.dom,this),window&&window.dispatchEvent(_);else return typeof window<"u"&&window.dispatchEvent(_),this.dom}processPage(){this.els=Mt(this.document),this.applyBehaviors()}unsetNamespace(t){this.namespaces.delete(t)}setBaseUrl(t){this.base=t}append(t,i){let n=this;if(i){let o=t.call(n.utilities,i);o&&!n.childExists(i.firstElementChild,o.nodeName)&&n.appendBasic(i,o)}else return function(){if(!this.hasAttribute("data-processed")){let o=t.call(n.utilities,this);o&&!n.childExists(this.firstElementChild,o.nodeName)&&n.appendBasic(this,o)}}}appendBasic(t,i){this.discardContent?t.innerHTML="":F(t,!0),t.appendChild(i)}bName(t){return t.tagName.substring(0,t.tagName.indexOf("-")).toLowerCase()+":"+t.getAttribute("data-origname")}childExists(t,i){return t&&t.nodeName==i?!0:t&&t.nextElementSibling&&this.childExists(t.nextElementSibling,i)}decorator(t){if(Array.isArray(t)&&t.length==0)return function(n){};if(Array.isArray(t)&&!Array.isArray(t[0]))return this.applyDecorator(t);let i=this;return function(n){for(let o of t)if(n.matches(o[0])||o[0]==="_")return Array.isArray(o[1])?i.decorator(o[1]).call(this,n):o[1].call(this,n)}}applyDecorator(t){let i=this;return function(n){let o=[];for(let a=0;a<t.length;a++)o.push(i.template(t[a],n));return i.insert(n,o)}}getFallback(t,i){if(t[i])return t[i]instanceof Function?t[i]:this.decorator(t[i])}getHandler(t,i){if(t[i])return t[i]instanceof Function?this.append(t[i]):this.append(this.decorator(t[i]))}insert(t,i){let n=this.document.createElement("span");for(let o of Array.from(t.childNodes))o.nodeType===1&&!o.hasAttribute("data-processed")&&this.processElement(o);if(i[0].match("<[^>]+>")&&i[1]&&i[1].match("<[^>]+>"))n.innerHTML=i[0]+t.innerHTML+(i[1]?i[1]:"");else{n.innerHTML=i[0],n.setAttribute("data-before",i[0].replace(/<[^>]+>/g,"").length);for(let o of Array.from(t.childNodes))n.appendChild(o.cloneNode(!0));i.length>1&&(n.innerHTML+=i[1],n.setAttribute("data-after",i[1].replace(/<[^>]+>/g,"").length))}return n}processElement(t){if(t.hasAttribute("data-origname")&&!t.hasAttribute("data-processed")){let i=this.getFallback(this.bName(t));i&&(this.append(i,t),t.setAttribute("data-processed",""))}for(let i of Array.from(t.childNodes))i.nodeType===1&&this.processElement(i)}template(t,i){let n=t;if(t.search(/\$(\w*)(@([a-zA-Z:]+))/)){let o=/\$(\w*)@([a-zA-Z:]+)/g,a;for(;a=o.exec(t);)i.hasAttribute(a[2])?a[1]&&this.utilities[a[1]]?n=n.replace(a[0],this.utilities[a[1]](i.getAttribute(a[2]))):n=n.replace(a[0],i.getAttribute(a[2])):n=n.replace(a[0],"")}return n}applyBehaviors(){typeof window<"u"&&window.customElements?this.define.call(this,this.els):this.fallback.call(this,this.els)}define(t){for(let i of t){const n=this.getHandler(this.behaviors,i);V(i,n,this.debug)}}fallback(t){for(let i of t){let n=this.getFallback(this.behaviors,i);if(n)for(let o of Array.from((this.dom&&!this.done?this.dom:this.document).getElementsByTagName(E(i))))o.hasAttribute("data-processed")||this.append(n,o)}}static savePosition(){window.sessionStorage.setItem(window.location+"-scroll",window.scrollY)}static restorePosition(){if(window.location.hash)setTimeout(function(){let t=this.document.querySelector(window.decodeURI(window.location.hash));t&&t.scrollIntoView()},100);else{let t;(t=window.sessionStorage.getItem(window.location+"-scroll"))&&setTimeout(function(){window.scrollTo(0,t)},100)}}}try{if(typeof window<"u"){window.CETEI=h,window.addEventListener("beforeunload",h.savePosition);var _=new Event("ceteiceanload");window.addEventListener("ceteiceanload",h.restorePosition)}}catch(e){console.log(e)}function G(e){let t=e.split(" "),i=[];for(let n of t)i.push(n.split(",").map(o=>parseInt(o)));return i}function St(e){const[t,i,n,o]=[e.getAttribute("ulx"),e.getAttribute("uly"),e.getAttribute("lrx"),e.getAttribute("lry")];return[[parseInt(t),parseInt(i)],[parseInt(n),parseInt(o)]]}let Ht={tei:{note:[["[type=gloss]",function(e){this.noteIndex?this.noteIndex++:this.noteIndex=1;let t="note"+this.noteIndex,i=document.createElement("a");i.setAttribute("id","src"+t),i.setAttribute("href","#"+t),i.innerHTML=this.noteIndex;let n=document.createElement("sup");n.appendChild(i);let o=this.dom.querySelector("ol.notes");o||(o=document.createElement("ol"),o.setAttribute("class","notes"),this.dom.appendChild(o));let a=document.createElement("li");return a.id=t,a.innerHTML='<a href="#src'+t+'">^</a> '+e.innerHTML,o.appendChild(a),n}]],ptr:function(e){if(e.getAttribute("target")==="#")console.log("Ignoring empty ptrs...");else{var t=document.createElement("a");return t.href=e.getAttribute("target"),t.innerHTML=">",t}},ref:function(e){if(e.getAttribute("target")==="#")console.log("Ignoring empty refs...");else{var t=document.createElement("a");return t.href=e.getAttribute("target"),t.innerHTML=e.innerHTML,t}},graphic:function(e){e.getAttribute("url")==="#"&&console.log("Ignoring non-existent graphics...")},pb:function(e){var t=document.createElement("p");return t.innerHTML=e.getAttribute("n"),t.classList.add("signature"),t},app:function(e){for(const t of e.children)t.classList.add(`var-${e.getAttribute("subtype")}`)},rdg:function(e){e.hasAttribute("data-empty")&&(e.innerHTML="[Does not exist in 1609]")},lem:function(e){e.hasAttribute("data-empty")&&(e.innerHTML="[+1609]")},fw:[["[type=horizontalRule]",function(e){return document.createElement("hr")}]],ab:[["tei-body tei-ab",function(e){let t=e.childNodes,i=[],n="";for(let a of t)if(a.tagName==="TEI-LB"){n!=""&&(i.push(n),n=""),n=document.createElement("span"),n.appendChild(a.cloneNode(!0));let s={},r=a.getAttribute("facs"),l=document.getElementById(r.slice(1)),c=l.getAttribute("points"),C=G(c),d=l.getAttribute("rendition");s[d]={id:l.id,points:C};let w={};const f=l.parentElement;let N=G(f.getAttribute("points"));w[f.getAttribute("rendition")]={points:N,id:f.id};let W={};const j=f.parentElement;let Z=[];for(a of j.children)a.tagName==="TEI-GRAPHIC"&&Z.push({url:a.getAttribute("url"),width:a.getAttribute("width"),height:a.getAttribute("height")});W.Facsimile={id:j.id,imgFiles:Z,points:St(j)};let Bt={detail:{...s,...w,...W}},qt=new CustomEvent("drawBox",Bt);n.onmouseenter=function(){dispatchEvent(qt)}}else n!=""&&n.appendChild(a.cloneNode(!0));i.push(n);let o=document.createElement("div");for(let a of i)o.appendChild(a);return o}]]}};function J(e){let t,i;return{c(){t=I("p"),i=Q(e[0]),k(t,"data-testid","error-message")},m(n,o){T(n,t,o),K(t,i)},p(n,o){o&1&&et(i,n[0])},d(n){n&&x(t)}}}function Pt(e){let t,i=e[0]&&J(e);return{c(){t=I("div"),i&&i.c(),k(t,"id","TEI-container"),k(t,"data-testid","TEI-container")},m(n,o){T(n,t,o),i&&i.m(t,null)},p(n,[o]){n[0]?i?i.p(n,o):(i=J(n),i.c(),i.m(t,null)):i&&(i.d(1),i=null)},i:b,o:b,d(n){n&&x(t),i&&i.d()}}}function Ot(e,t,i){let{path:n=""}=t,o,a=!1,s;return ot(async()=>{try{s=await fetch("./dist/TeiConverter.config.json").then(l=>l.json())}catch(l){console.log(l)}try{if(n==="")throw"No path specified";var r=new h;r.addBehaviors(Ht),r.getHTML5(n,function(l){document.getElementById("TEI-container").appendChild(l)}),a=!0}catch(l){i(0,o=l.toString()),a=!0;return}console.log(s)}),e.$$set=r=>{"path"in r&&i(1,n=r.path)},[o,n]}class jt extends gt{constructor(t){super(),mt(this,t,Ot,Pt,X,{path:1})}get path(){return this.$$.ctx[1]}set path(t){this.$$set({path:t}),H()}}customElements.define("tei-converter",ht(jt,{path:{}},[],[],!1))});
