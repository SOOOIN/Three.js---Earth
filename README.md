# Three.js---Earth

![ezgif com-gif-maker](https://user-images.githubusercontent.com/56300369/176211058-ba73fe58-98c9-468e-885b-b41f42c76507.gif)

[완성 페이지로 이동](https://soooin.github.io/Three.js---Earth/public/index.html)

---

# Bare Minimum
 - 1.튜토리얼 영상을 참고해서 3D Earth구현 완성하기.

# Advanced.
  - 1.지구 주변에 태양과 달 추가하기.
  - 2.달은 지구를 중심축으로 회전한다.
  - 3.인공위성 추가하기 (선택)
  
---
## 해결한 오류
---
< 1 ~ 2 회차 > : 서버이슈.
- [ ] 모듈 서버불러오기 => node.js와 THREE.js의 호환이슈
- [ ] 오르빗 서버 불러오기 => node.js와 THREE.js의 호환이슈
```javascript
❌[발생한 문제]
Uncaught TypeError: Failed to resolve module specifier "three". Relative references must start with either "/", "./", or "../"

⭕️[해결방법]
<script type="importmap"> 사용으로 해결.
```

----
< 3 회차 > : THREE.TextureLoader( ) 에러발생
- [ ] 텍스쳐 불러오기 => Three.js  버전에 따른 문법오류 
- [ ] 버퍼 불러오기 => Three.js  버전에 따른 문법오류 
```javascript
const earthMaterial = new THREE.MeshPhongMaterial({
      map: THREE.ImageUtils.loadTexture('texture/earthmap1k.jpg')
})

❌[발생한 문제]
Failed to load resource: net::ERR_FAILED

⭕️[해결방법]
const texture = new THREE.TextureLoader();

const earthMaterial = new THREE.MeshPhongMaterial({
      map:texture.load('texture/earthmap1k.jpg'),
      bumpMap: texture.load('texture/earthbump.jpg'),
})
```
- [ ] canvas 영역내의, 검정 뒷배경 불러오기 오류 => 아마도 버전 따른 문법오류  
```javascript
❌[발생한 문제]
      renderer.setClearColor(0x000000, 0.0); 
      // 뒷배경 색상(검정)이 나타나지 않음.
⭕️[해결방법]
      background-color: black;
      // css 배경색으로 해결.
```
----
< 4회차 > : !!——클론 완성——!!
```javascript
❌[발생한 문제]
const stats = stats();
document.body.appendChild(stats.dom);
```
- [ ] 에러 발생.
=> 발생한이유와 사용하는이유.

- [ ] 마우스 회전 불가 -> 안움직이는 이유는?

---

### 추가할 것 ❗️

[ 달이랑 태양 불러오기]
