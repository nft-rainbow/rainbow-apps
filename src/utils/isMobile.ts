const ua = navigator.userAgent;

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
// const isMobile = window.innerHeight < 768;

export default isMobile;
