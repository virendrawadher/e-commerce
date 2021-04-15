import { useCartProd } from "../CartProdContext";

export function Cart(){

    const {state, dispatch} = useCartProd();
    return (
        <>
          <h1>Cart</h1>
          {
            state.cart.map((cartP) => {
                return (
                  <div>
                    <p>{cartP.name}{" "}</p>
                    <span><button onClick = {() => dispatch({type: "DECREMENT", cartP})}>-</button>{" "}{cartP.quantity}{" "}<button onClick = {() => dispatch({type: "INCREMENT", cartP})}>+</button></span>
                  </div>

                )
            })
          }
        </>
    )
  }