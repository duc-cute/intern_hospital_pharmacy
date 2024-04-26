// import Cookies from 'universal-cookie';

class localStorageService {
  ls = window.localStorage

  removeItem = key => {
    this.ls.removeItem(key);
  }

  setItem(key, value) {
    // const cookies = new Cookies();

    value = JSON.stringify(value)
    this.ls.setItem(key, value)
    //cookies.set(key, value, { path: '/' });
    return true
  }

  getItem(key) {
    //  const cookies = new Cookies();
    let value = this.ls.getItem(key)
    //let value = cookies.get(key);
    try {
      return JSON.parse(value)
    } catch (e) {
      return null
    }
  }

  getLoginUser = () => this.getItem("auth_user")

  isAdmin = () => this.getItem("is_admin")
  
  isSuperAdmin = () => this.getItem("is_super_admin")


  getListStore = () => this.getItem("list_store")

  getCurrentStore = () => this.getItem("current_store")

  isStore = () => this.getItem("is_store")
  
}

export default new localStorageService();