(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{11:function(e,t,a){},13:function(e,t,a){},14:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(5),o=a.n(c),l=(a(11),a(1)),s=a.n(l),m=a(3),i=a(2);a(13);var u=function(){var e=Object(n.useState)(""),t=Object(i.a)(e,2),a=t[0],c=t[1],o=Object(n.useState)(""),l=Object(i.a)(o,2),u=l[0],p=l[1],h=Object(n.useState)([]),f=Object(i.a)(h,2),d=f[0],E=f[1];console.log(d);var b=function(){fetch("http://localhost:3000/say",{method:"GET"}).then(function(){var e=Object(m.a)(s.a.mark((function e(t){var a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.json();case 2:a=e.sent,E(a);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())};Object(n.useEffect)((function(){b()}),[]);var v=function(){var e=Object(m.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:fetch("http://localhost:3000/say",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:a,say:u})}).then((function(){c(""),p(""),window.alert("\ubc29\uba85\ub85d\uc774 \ucd94\uac00\ub418\uc5c8\uc2b5\ub2c8\ub2e4."),b()})).catch((function(e){window.alert("\ub4f1\ub85d\uc5d0 \uc2e4\ud328\ud558\uc600\uc2b5\ub2c8\ub2e4.\n\uc624\ub958\uac00 \ubc18\ubcf5\ub418\uba74 \uad00\ub9ac\uc790\uc5d0\uac8c \ubb38\uc758\ud574\uc8fc\uc138\uc694.")}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"container"},r.a.createElement("h1",{className:"title"},"\ubc29\uba85\ub85d"),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"exampleInputEmail1"},"\ub2f9\uc2e0\uc740 \ub204\uad6c\uc2ed\ub2c8\uae4c?"),r.a.createElement("input",{type:"email",className:"form-control",id:"exampleInputEmail1","aria-describedby":"emailHelp",placeholder:"\ub2f9\uc2e0\uc758 \uc774\ub984\uc744 \uc785\ub825\ud558\uc138\uc694.",value:a,onChange:function(e){return c(e.target.value)}}),r.a.createElement("small",{id:"emailHelp",className:"form-text text-muted"},"\uac00\uc9dc \uc774\ub984\uc744 \uc785\ub825\ud558\uba74 \ub300\uba38\ub9ac\uac00 \ub429\ub2c8\ub2e4.")),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"exampleFormControlTextarea1"},"\ud558\uace0 \uc2f6\uc740 \ub9d0\uc744 \ub0a8\uaca8\uc8fc\uc138\uc694."),r.a.createElement("textarea",{className:"form-control",value:u,onChange:function(e){return p(e.target.value)},id:"exampleFormControlTextarea1",rows:"3"})),r.a.createElement("button",{type:"button",className:"mybutton btn btn-primary",onClick:v},"\ucd94\uac00"),r.a.createElement("table",{className:"table"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",{scope:"col"},"#"),r.a.createElement("th",{scope:"col"},"\uc791\uc131\uc790"),r.a.createElement("th",{scope:"col"},"\ub0b4\uc6a9"),r.a.createElement("th",{scope:"col"},"\ub0a0\uc9dc"))),r.a.createElement("tbody",null,d.map((function(e,t){return r.a.createElement("tr",{key:"sayItem_".concat(t)},r.a.createElement("th",{scope:"row"},e.id),r.a.createElement("td",null,e.name),r.a.createElement("td",null,e.say),r.a.createElement("td",null,e.createdAt.split("T")[0]))})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(u,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},6:function(e,t,a){e.exports=a(14)}},[[6,1,2]]]);
//# sourceMappingURL=main.22dcbe17.chunk.js.map