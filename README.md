# 소개
웹 프레임워크에서 모달을 제작한다면 react 에서는 Portal, vue 에서는 Teleport 를 사용할 것이다. 혹은 모달의 flag 를 부여하여 javascript 에서 on/off 시키는 형태로 구현될 것이다.
이 같은 방법은 전체 화면을 modal 이 차지하면서 modal 화면이 터치를 막으면서 modal 처럼 만든 것이다.
원래 modal 는 modal 이후 로직이 modal 에서 데이터를 전달 받기 전까지 로직이 진행 되지 않고 modal 의 영향에 따라 다음 로직이 결정 되어 져야 한다. 해당 의미를 좀더 명확히 따르기 위해서 모달의 호출을 async/await 로 구현하였다.

### 라이브러리 파일구조
```
modals
  +-- index.ts
  +-- modal.ts
  +-- ModalWaypoint.vue
```

### 라이브러리 개념
사용자가 모달을 만들때 라이브러리에서 wrap 되어진 props 를 추가적으로 받게 된다.(ModalBaseProperties)
모달에서 응답값을 추가된 props(resolve, reject) 를 호출하여 값을 전달한다.

### 사용예시

사용자가 정의한 샘플 모달
```vue
// IdPasswordInputModal.vue
<script setup lang="ts">
  import {ModalBaseProperties} from "./modal";

  type Props = ModalBaseProperties & {
    id: string,
  }
  const props = defineProps<Props>();
  const login = reactive<{ id: string, password: string }>({});
  const submit = () => props.resolve(toRaw(login));
  const cancel = () => props.reject('cancel');
</script>
<template>
  <div>
    id: <input type="text" :value="login.id">
    password: <input type="password" :value="login.password">
    <button @click="submit">submit</button>
    <button @click="cancel">cancel</button>
  </div>
</template>
```
로직상에서 사용자가 샘플로 제작한 팝업을 동적으로 호출 하여 사용 한다.
```javascript
async function callPopup(id){
  try{
    const ret = await modalPush({
        comp: IdPasswordInputModal,
        props: { id }
      });
    if(ret.id && ret.password){
      // 로그인
    }else{
      // 팝업 노출
    }
  } catch(e) {
    console.log(e)  // 'cancel'
  }
}
// 또는
async function callPopup2(id){
  modalPush({
    comp: IdPasswordInputModal,
    props: { id }
  }).then(({id, password}) =>{
    if(ret.id && ret.password){
      // 로그인
    }else{
      // 팝업 노출
    }
  }).catch((e)=>{
    console.log(e); // 'cancel'
  });
}
```
