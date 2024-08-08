import {
  Component,
  markRaw,
  Raw,
  ref,
} from 'vue';

export type ModalBaseProperties = {
  resolve: <T>(value?: T | PromiseLike<T>) => void,
  reject: <T>(value?: T | PromiseLike<T>) => void,
}

export type ModalProperties = {
  comp: Component, // TODO: vue component type
  props?: any, // TODO: vue props type
  slots?: any, // TODO: vue slot type
}

export type ModalInfo = ModalBaseProperties & Omit<ModalProperties, 'comp'> & {comp: Raw<Component>};
export type ModalOptions = {
  /**
   * component 의 중복 호출 허용 여부
   * default : false(|undefined)
   */
  duplicate: boolean,
}

export const modals = ref<ModalInfo[]>([]);

export const modalPush = <RES = any, REJ = any>(properties: ModalProperties, options?: ModalOptions) => {
  if (!options?.duplicate) {
    const has = modals.value.find((modal) => modal.comp === properties.comp);
    if (has) return null;
  }

  return new Promise((resolve, reject) => {
    const resolveConfirm = (data: RES) => {
      modals.value.pop();
      resolve(data);
    };

    const rejectCancel = (data: REJ) => {
      modals.value.pop();
      reject(data);
    };

    const {
      comp,
      props,
      slots,
    } = properties;

    modals.value = modals.value.concat([{
      resolve: resolveConfirm,
      reject: rejectCancel,
      comp: markRaw(comp), // Component 사이즈가 클수 있기 때문에 markRaw 로 원시데이터로 취급처리, https://ko.vuejs.org/api/reactivity-advanced#markraw
      props,
      slots,
    } as ModalInfo]); // TODO: as 사용안하는 방법으로 해결
  });
};
