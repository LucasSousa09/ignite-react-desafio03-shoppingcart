import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from 'react-icons/md';

import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../util/format';
import { Container, ProductTable, Total } from './styles';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

const Cart = (): JSX.Element => {
  const { cart, removeProduct, updateProductAmount } = useCart();

  const cartFormatted = cart.map(product => ({
    amount: product.amount,
    id: product.id,
    image: product.image,
    title: product.title,
    price: product.price,
    priceFormated: formatPrice(product.price),
    subTotal: formatPrice(product.price * product.amount)
  }))

  const total =
    formatPrice(
      cart.reduce((sumTotal, product) => {
        return sumTotal + (product.amount * product.price)
      }, 0)
    )

  function handleProductIncrement(product: Product) {
    const amount = product.amount + 1
    const productId = product.id

    updateProductAmount({ productId, amount })
  }

  function handleProductDecrement(product: Product) {
    const amount = product.amount - 1
    const productId = product.id
    updateProductAmount({ productId, amount })
  }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId)
  }

  return (
    <Container>
      {
        cart.length > 0 ?
          <>
            <ProductTable>
              <thead>
                <tr>
                  <th aria-label="product image" />
                  <th>PRODUTO</th>
                  <th>QTD</th>
                  <th>SUBTOTAL</th>
                  <th aria-label="delete icon" />
                </tr>
              </thead>
              <tbody>
                {
                  cartFormatted.map((product, idx) => {
                    return (
                      <tr key={product.id} data-testid="product">
                        <td>
                          <img src={product.image} />
                        </td>
                        <td>
                          <strong>{product.title}</strong>
                          <span>{product.priceFormated}</span>
                        </td>
                        <td>
                          <div>
                            <button
                              type="button"
                              data-testid="decrement-product"
                              disabled={product.amount <= 1}
                              onClick={() => handleProductDecrement(product)}
                            >
                              <MdRemoveCircleOutline size={20} />
                            </button>
                            <input
                              type="text"
                              data-testid="product-amount"
                              readOnly
                              value={product.amount}
                            />
                            <button
                              type="button"
                              data-testid="increment-product"
                              onClick={() => handleProductIncrement(product)}
                            >
                              <MdAddCircleOutline size={20} />
                            </button>
                          </div>
                        </td>
                        <td>
                          <strong>{product.subTotal}</strong>
                        </td>
                        <td>
                          <button
                            type="button"
                            data-testid="remove-product"
                            onClick={() => handleRemoveProduct(product.id)}
                          >
                            <MdDelete size={20} />
                          </button>
                        </td>
                      </tr>)
                  })
                }
              </tbody>
            </ProductTable>
            <footer>
              <button type="button">Finalizar pedido</button>

              <Total>
                <span>TOTAL</span>
                <strong>{total}</strong>
              </Total>
            </footer>
          </>
          :
          <h1 className="empty-cart">Carrinho vazio</h1>
      }

    </Container>
  );
};

export default Cart;
