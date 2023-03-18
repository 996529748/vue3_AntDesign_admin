interface OptionType {

  tip: string,

  size: string,

  loading: boolean,

}

interface createLoadingType {
  showLoading: () => void;
  hideLoading: () => void;
}

type Nullable<T> = T | null;