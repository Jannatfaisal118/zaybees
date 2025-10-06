import { useContext, useState, useEffect } from "react";
import axios from "axios";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { Country, State, City } from "country-state-city";

const PlaceOrder = () => {
  const [method, setMethod] = useState("card");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [token, setToken] = useState("");

  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [cityName, setCityName] = useState("");
  const allowedCountries = ["PK", "US", "UK", "JP"];
  const [phoneExample, setPhoneExample] = useState("");
  const [phoneMaxLength, setPhoneMaxLength] = useState(15);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const {
    navigate,
    backendUrl,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
    voucherCode,
    setVoucherCode,
    discount,
    validateVoucher,
    MIN_VOUCHER_AMOUNT,
    currency,
    formatPrice,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const phoneExamples = {
    PK: "345 7282 876",
    US: "555 123 4567",
    UK: "020 7946 0958",
    JP: "080-1234-5678",
  };
  const phoneLengths = { PK: 10, US: 10, UK: 11, JP: 11 };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    const filteredCountries = allCountries.filter((c) =>
      allowedCountries.includes(c.isoCode)
    );
    setCountries(filteredCountries);
  }, []);

  useEffect(() => {
    if (countryCode) {
      const countryStates = State.getStatesOfCountry(countryCode);
      setStates(countryStates);
      setStateCode("");
      setCityName("");
      setCities([]);

      const country = Country.getCountryByCode(countryCode);
      if (country) {
        setPhoneExample(phoneExamples[countryCode] || "123456789");
        setPhoneMaxLength(phoneLengths[countryCode] || 15);
      }
    }
  }, [countryCode]);

  useEffect(() => {
    if (stateCode) {
      const stateCities = City.getCitiesOfState(countryCode, stateCode);
      setCities(stateCities);
      setCityName("");
    }
  }, [stateCode]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!/^[\w.+-]+@gmail\.com$/.test(formData.email)) {
      toast.error("Email must be a valid @gmail.com address");
      return;
    }
    const digitsOnlyPhone = formData.phone.replace(/\D/g, "");
    if (digitsOnlyPhone.length !== phoneMaxLength) {
      toast.error(`Phone number must have ${phoneMaxLength} digits`);
      return;
    }

    const subtotal = getCartAmount();
    if (subtotal === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const taxes = subtotal * 0.08;
    const totalAmount = Math.max(subtotal + delivery_fee - discount + taxes, 0);

    try {
      const orderItems = [];
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          const quantity = cartItems[productId][size];
          if (quantity > 0) {
            const prod = products.find((p) => p._id === productId);
            if (!prod) continue;
            orderItems.push({
              productId: prod._id,
              name: prod.name,
              size,
              quantity,
              price: prod.price,
            });
          }
        }
      }

      const orderData = {
        address: {
          ...formData,
          phone: `+${Country.getCountryByCode(countryCode)?.phonecode || ""}${
            formData.phone
          }`,
          country: Country.getCountryByCode(countryCode)?.name || "",
          state:
            State.getStateByCodeAndCountry(stateCode, countryCode)?.name || "",
          city: cityName,
        },
        shippingMethod,
        items: orderItems,
        amount: totalAmount,
        paymentMethod: method,
        voucherCode: voucherCode || null,
        discount,
        taxes,
        currency,
      };

      const response = await axios.post(
        backendUrl + "/api/order/place",
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        if (method === "cod") {
          toast.success("Order placed successfully!");
          setCartItems({});
          navigate("/orders");
        } else {
          const { gatewayUrl, paymentFields } = response.data;
          const form = document.createElement("form");
          form.method = "POST";
          form.action = gatewayUrl;
          Object.entries(paymentFields).forEach(([key, value]) => {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = value;
            form.appendChild(input);
          });
          document.body.appendChild(form);
          form.submit();
        }
      } else {
        toast.error(response.data.message || "Payment failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
      if (error.response?.status === 401) navigate("/login");
    }
  };

  const subtotal = getCartAmount();
  const taxes = subtotal * 0.08;
  const shippingCost = delivery_fee;
  const totalAmount = Math.max(subtotal + shippingCost - discount + taxes, 0);

  return (
    <div className="min-h-[80vh] p-6 sm:p-12 bg-bgLight text-textLight dark:bg-bgDark dark:text-textDark transition-colors">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col lg:flex-row justify-between gap-10"
      >
        {/* Left Side */}
        <div className="flex flex-col gap-6 w-full lg:max-w-[520px]">
          <Title text1="Delivery" text2="Information" />

          {/* First + Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              required
              name="firstName"
              value={formData.firstName}
              onChange={onChangeHandler}
              placeholder="First Name"
              className="border border-accent dark:border-primary rounded-lg px-4 py-2.5 shadow-sm bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark transition-colors"
            />
            <input
              required
              name="lastName"
              value={formData.lastName}
              onChange={onChangeHandler}
              placeholder="Last Name"
              className="border border-accent dark:border-primary rounded-lg px-4 py-2.5 shadow-sm bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark transition-colors"
            />
          </div>

          {/* Email */}
          <input
            required
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            placeholder="email@gmail.com"
            className="border border-accent dark:border-primary rounded-lg px-4 py-2.5 shadow-sm bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark transition-colors"
          />

          {/* Address */}
          <input
            required
            name="street"
            value={formData.street}
            onChange={onChangeHandler}
            placeholder="Street Address"
            className="border border-accent dark:border-primary rounded-lg px-4 py-2.5 shadow-sm bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark transition-colors"
          />

          {/* Country + State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Country</label>
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="border border-accent dark:border-primary rounded-lg px-4 py-2.5 shadow-sm w-full bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark transition-colors"
              >
                <option value="">Select Country</option>
                {countries.map((c) => (
                  <option key={c.isoCode} value={c.isoCode}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium">State</label>
              <select
                value={stateCode}
                onChange={(e) => setStateCode(e.target.value)}
                disabled={!countryCode}
                className="border border-accent dark:border-primary rounded-lg px-4 py-2.5 shadow-sm w-full bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark transition-colors"
              >
                <option value="">Select State</option>
                {states.map((s) => (
                  <option key={s.isoCode} value={s.isoCode}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* City + Zipcode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">City</label>
              <select
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                disabled={!stateCode}
                className="border border-accent dark:border-primary rounded-lg px-4 py-2.5 shadow-sm w-full bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark transition-colors"
              >
                <option value="">Select City</option>
                {cities.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium">Zip Code</label>
              <input
                required
                name="zipcode"
                value={formData.zipcode}
                onChange={onChangeHandler}
                placeholder="Zip Code"
                className="border border-accent dark:border-primary rounded-lg px-4 py-2.5 shadow-sm w-full bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark transition-colors"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="border border-accent dark:border-primary rounded-lg px-4 py-2.5 shadow-sm bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark transition-colors"
            >
              <option value="">Code</option>
              {countries.map((c) => (
                <option key={c.isoCode} value={c.isoCode}>
                  +{c.phonecode}
                </option>
              ))}
            </select>
            <input
              required
              name="phone"
              value={formData.phone}
              onChange={onChangeHandler}
              placeholder={phoneExample}
              maxLength={phoneMaxLength}
              className="border border-accent dark:border-primary rounded-lg px-4 py-2.5 shadow-sm bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark transition-colors sm:col-span-2"
            />
          </div>

          {/* Shipping Method */}
          <div>
            <label className="text-sm font-medium mb-1 block">Shipping Method</label>
            <select
              value={shippingMethod}
              onChange={(e) => setShippingMethod(e.target.value)}
              className="border border-accent dark:border-primary rounded-lg px-4 py-2.5 shadow-sm w-full bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark transition-colors"
            >
              <option value="standard">Standard (5-7 Business Days)</option>
              <option value="express">Express (2-4 Business Days)</option>
              <option value="international">International (7-14 Business Days)</option>
            </select>
          </div>

          {/* Voucher */}
          <div className="flex gap-2 mt-4">
            <input
              type="text"
              placeholder="Promo Code"
              value={voucherCode || ""}
              onChange={(e) => setVoucherCode(e.target.value)}
              className="border border-accent dark:border-primary rounded-lg px-4 py-2.5 shadow-sm flex-1 bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark transition-colors"
            />
            <button
              type="button"
              onClick={() => validateVoucher(voucherCode)}
              disabled={subtotal < MIN_VOUCHER_AMOUNT || !voucherCode}
              className={`px-5 py-2.5 rounded-lg text-white font-medium transition-colors ${
                subtotal >= MIN_VOUCHER_AMOUNT && voucherCode
                  ? "bg-primary hover:bg-accent"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Apply
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Minimum order amount: {formatPrice(MIN_VOUCHER_AMOUNT)}
          </p>

          {/* Payment Method */}
          <div className="mt-6">
            <Title text1="Payment" text2="Method" />
            <div className="grid sm:grid-cols-2 gap-4 mt-3">
              {[
                { id: "card", label: "Credit/Debit Card", icon: assets.card },
                { id: "paypal", label: "PayPal", icon: assets.paypal },
                { id: "applepay", label: "Apple Pay", icon: assets.applepay },
                { id: "googlepay", label: "Google Pay", icon: assets.googlepay },
                { id: "cod", label: "Cash on Delivery" },
              ].map((pay) => (
                <div
                  key={pay.id}
                  onClick={() => setMethod(pay.id)}
                  className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer shadow-sm transition-colors
                    ${method === pay.id
                      ? "border-primary bg-bgLight dark:bg-bgDark"
                      : "border-accent dark:border-gray-600 bg-bgLight dark:bg-bgDark"}
                  `}
                >
                  <div
                    className={`w-4 h-4 rounded-full border ${
                      method === pay.id ? "bg-black dark:bg-primary" : "border-gray-400"
                    }`}
                  ></div>
                  {pay.icon ? (
                    <img className="h-5 mx-2" src={pay.icon} alt={pay.label} />
                  ) : (
                    <p className="text-sm">{pay.label}</p>
                  )}
                </div>
              ))}
            </div>
            {method === "cod" && (
              <p className="text-sm text-accent dark:text-primary mt-2">
                Cash on Delivery is available only in select countries.
              </p>
            )}
          </div>
        </div>

        {/* Right Side - Order Summary */}
        <div className="w-full lg:max-w-[420px]">
          <Title text1="Order" text2="Summary" />
          <div className="border border-accent dark:border-primary rounded-xl p-5 bg-bgLight dark:bg-bgDark shadow-md mt-4 space-y-4 transition-colors">
            {Object.entries(cartItems).map(([productId, sizes]) => {
              const prod = products.find((p) => p._id === productId);
              if (!prod) return null;
              return Object.entries(sizes).map(([size, qty]) => {
                if (qty <= 0) return null;
                return (
                  <div
                    key={productId + size}
                    className="flex justify-between items-center border-b pb-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.image[0]}
                        alt={prod.name}
                        className="h-14 w-14 object-cover rounded-lg"
                      />
                      <div>
                        <p className="text-sm font-medium">{prod.name}</p>
                        <p className="text-xs text-gray-500">Size: {size}</p>
                        <p className="text-xs text-gray-500">Qty: {qty}</p>
                      </div>
                    </div>
                    <p className="font-medium">{formatPrice(prod.price * qty)}</p>
                  </div>
                );
              });
            })}

            {/* Cost Breakdown */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{formatPrice(shippingCost)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>{formatPrice(taxes)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Total</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-3 rounded-lg bg-primary hover:bg-accent text-white font-semibold transition-colors shadow-md"
            >
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
