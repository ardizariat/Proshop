import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProductRating from "../Components/ProductRating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../../redux/actions/productActions";
import { Loader, Message } from "../../../components";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const { productId } = useParams();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  const addToCartHandler = () => {
    navigate({
      pathname: `/cart/${productId}`,
      search: `?qty=${qty}`,
    });
  };

  useEffect(() => {
    dispatch(listProductDetails(productId));
  }, [dispatch, productId]);

  return (
    <>
      <Link className="btn btn-dark" to="/">
        <i className="fa-solid fa-arrow-left"></i> Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row className="my-3">
          <Col md={6} lg={6} sm={12}>
            <Image src={product.image} fluid alt={product.name} />
          </Col>
          <Col md={3} lg={3} sm={12}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <ProductRating
                  rating={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price : ${product.price}</ListGroup.Item>

              <ListGroup.Item>
                Description : ${product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3} lg={3} sm={12}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price :</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status :</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? "Ready" : "Out of stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <Button
                        onClick={addToCartHandler}
                        className="btn-block btn-dark"
                        disabled={product.countInStock <= 0}
                      >
                        <i className="fas fa-shopping-cart fa-lg"></i> Add To
                        Cart
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductDetail;
