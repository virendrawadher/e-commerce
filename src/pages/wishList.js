import { useCartProd } from "../CartProdContext";

export function WishList(props){

    const {state, dispatch} = useCartProd();
    return (
        <>
          <h1>WishList</h1>
          {
            state.wishList.map((product) => {
                return (
                    <div>
                        <span key = {product.id}>{product.name}</span>{" "}
                        <button onClick = {() => dispatch({type: "WISHLIST", product})}>Remove</button>
                    </div>

                )
            })
          }
        </>
    )
  }