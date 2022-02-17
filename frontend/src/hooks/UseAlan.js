import { useEffect, useState, useCallback } from "react"
import alanBtn from "@alan-ai/alan-sdk-web"
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart,removeItemsFromCart } from "../actions/cartAction";

const COMMANDS = {
  OPEN_MENU: "open-menu",
  CLOSE_MENU: "close-menu",
  ADD_ITEM: "add-item",
  REMOVE_ITEM: "remove-item",
  PURCHASE_ITEMS: "purchase-items",
  OPEN_DISH: "view-dish",
  OPEN_CONTACT: "view-contact",
  OPEN_ABOUT: "view-about"
}

const UseAlan = ({history}) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.products);

  const [alanInstance, setAlanInstance] = useState()

  const isCartEmpty = cartItems.length === 0

  // open menu 
  const openCart = useCallback(() => {
    if (isCartEmpty) {
      alanInstance.playText("You have no items in your menu")
    } else {
      alanInstance.playText("Opening menu")
      history.push("/cart");
      alanInstance.remove();
    }
  }, [alanInstance, isCartEmpty, history])

  // open contact 
  const openContact = useCallback(() => {
      alanInstance.playText("Opening contact page")
      history.push("/contact");
      alanInstance.remove();
  }, [alanInstance, history])
  
  // open about 
  const openAbout = useCallback(() => {
      alanInstance.playText("Opening about page")
      history.push("/about");
      alanInstance.remove();
  }, [alanInstance, history])
  
  // close menu
  const closeCart = useCallback(() => {
      alanInstance.playText("Closing cart");
      history.push("/");
      alanInstance.remove();
  }, [alanInstance, isCartEmpty,history])

  // add item in menu list
  const addItem = useCallback(
    ({ detail: { product, quantity } }) => {
        products.filter((x, index, arr) => arr[index].name.toLowerCase() === product.toLowerCase()).map(({ _id, name }) => {
            dispatch(addItemsToCart(_id, quantity));
          alanInstance.playText(
            `Add ${quantity} of the ${product} item to your cart`
          );
    }); 
    }, [alanInstance, dispatch])
  
    
    // remove dish from menu list
    const removeItem = useCallback(
      ({ detail: { product } }) => {
        if (cartItems == null) {
          alanInstance.playText(`I cannot find the ${product} item in your cart`)
        } else {
          cartItems.filter((item,index,arr)=> arr[index].name.toLowerCase() === product.toLowerCase()).map((item) => {
            dispatch(removeItemsFromCart(item.product));
            alanInstance.playText(`Removed the ${product} item from your cart`);
          });
        }
      },[alanInstance, dispatch])
      
      // order sending method.. 
      const purchaseItems = useCallback(() => {
          alanInstance.playText("Checking out")
          history.push("/login?redirect=shipping");
          alanInstance.remove();
      }, [alanInstance, isCartEmpty])
  
      // open single dish ...
  const openDish = useCallback(
    ({ detail: { product } }) => {
              products.filter((x, index, arr) => arr[index].name.toLowerCase() === product.toLowerCase()).map(({ _id, name }) => {
                history.push(`/product/${_id}`);
              }); 
              alanInstance.remove();
        },[alanInstance,history])

  useEffect(() => {
    window.addEventListener(COMMANDS.OPEN_MENU, openCart)
    window.addEventListener(COMMANDS.CLOSE_MENU, closeCart)
    window.addEventListener(COMMANDS.ADD_ITEM, addItem)
    window.addEventListener(COMMANDS.REMOVE_ITEM, removeItem)
    window.addEventListener(COMMANDS.PURCHASE_ITEMS, purchaseItems)
    window.addEventListener(COMMANDS.OPEN_DISH, openDish)
    window.addEventListener(COMMANDS.OPEN_CONTACT, openContact)
    window.addEventListener(COMMANDS.OPEN_ABOUT, openAbout)

    return () => {
      window.removeEventListener(COMMANDS.OPEN_MENU, openCart)
      window.removeEventListener(COMMANDS.CLOSE_MENU, closeCart)
      window.removeEventListener(COMMANDS.ADD_ITEM, addItem)
      window.removeEventListener(COMMANDS.REMOVE_ITEM, removeItem)
      window.removeEventListener(COMMANDS.PURCHASE_ITEMS, purchaseItems)
      window.removeEventListener(COMMANDS.OPEN_DISH, openDish)
      window.removeEventListener(COMMANDS.OPEN_CONTACT, openContact)
      window.removeEventListener(COMMANDS.OPEN_ABOUT, openAbout)
    }
  }, [openCart, closeCart, addItem,removeItem,purchaseItems,openDish,openAbout])

  useEffect(() => {
    if (alanInstance != null) return

    setAlanInstance(
      alanBtn({
        top: "15px",
        left: "15px",
        state:"idle",
        key: "1a96e1a2989fd60f6e89cc2d06572eb92e956eca572e1d8b807a3e2338fdd0dc/prod",
        onCommand: ({ command, payload }) => {
          window.dispatchEvent(new CustomEvent(command, { detail: payload }))
        }
      })
    )
  }, [])

  return null
}
export default UseAlan;