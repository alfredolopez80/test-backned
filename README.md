# omni-nft-oai-fee

## Description

API REST for getting the Ratio of OAI fee to BNB fee or OAI fee to MATIC fee.
<br/>

## Run the API with: develop enviroment with docker

```bash
docker-compose up
```

### Details About End Point
<br/>

### /Test

**Verify the API is Live**

----

  Returns a message if the API is Live.

* **URL**

  /

* **Method:**

  `GET`

* **URL Params**

  None

* **Success Response:**

  * **Code:** 200 <br/>
    **Content:** `{ "API Ratio OAI/BNB and OAI/MATIC is Live" }`

* **Error Response:**

  * **No Response** or ERR_CONNECTION_REFUSED

* **Sample Call:**

  ```bash
  curl -X GET http://localhost:8000/
  ```

---
<br/>

### /oai/matic

**Getting the Price of OAI in MATIC**

---

  Returns the price of OAI/MATIC in decimal

  * **URL**

	/oai/matic

  * **Method:**

	  `GET`

  * **URL Params**

	  None

  * **Success Response:**

  	* **Code:** 200 <br/>
    **Content:** 0.000010571792484978    // OAI/MATIC price in decimal

  * **Error Response:**

  	* **Code:** 404 NOT FOUND <br/>
    **Content:** `{ "status" : "error", message : { "status" : 404 } }`

* **Sample Call:**

  ```bash
  curl -X GET http://localhost:8000/oai/matic
  ```

---
<br/>

### /oai/bnb

**Getting the Price of OAI in BNB**

---

  Returns the price of OAI/BNB in decimal

* **URL**

 /oai/bnb

* **Method:**

   `GET`

* **URL Params**

   None

* **Success Response:**

   * **Code:** 200 <br/>
    **Content:** 0.0.000082986021715981    // OAI/BNB price in decimal

* **Error Response:**

   * **Code:** 404 NOT FOUND <br/>
    **Content:** `{ "status" : "error", message : { "status" : 404 } }`

* **Sample Call:**

  ```bash
  curl -X GET http://localhost:8000/oai/bnb
  ```

---

### /oai/usd/bnb

**Getting the Price of OAI in USD based on Pancanke Swap**

---

  Returns the price of OAI/USD in decimal based on Pancake Swap

* **URL**

 /oai/usd/bnb

* **Method:**

   `GET`

* **URL Params**

   None

* **Success Response:**

  * **Code:** 200 <br/>
    **Content:** 0.035394845382369124    // OAI/USD price in decimal

* **Error Response:**

  * **Code:** 404 NOT FOUND <br/>
    **Content:** `{ "status" : "error", message : { "status" : 404 } }`

* **Sample Call:**

  ```bash
  curl -X GET http://localhost:8000/oai/usd/bnb
  ```

---

### /oai/usd/matic

**Getting the Price of OAI in USD based on Quick Swap**

---

  Returns the price of OAI/USD in decimal based on Quick Swap

* **URL**

 /oai/usd/matic

* **Method:**

   `GET`

* **URL Params**

   None

* **Success Response:**

  * **Code:** 200 <br/>
    **Content:** 0.03388514846769769  // OAI/BNB price in decimal

* **Error Response:**

  * **Code:** 404 NOT FOUND <br/>
    **Content:** `{ "status" : "error", message : { "status" : 404 } }`

* **Sample Call:**

  ```bash
  curl -X GET http://localhost:8000/oai/usd/matic
  ```

---

### /oai/matic/:gasUsed/:gasPrice

**Getting the Amount of OAI in MATIC for cover a Tx in Polygon**

---

  Returns the amount of OAI for cover a Matic transaction in Polygon (add 5% fee DUST)

* **URL**

 /oai/matic/:gasUsed/:gasPrice

* **Method:**

   `GET`

* **URL Params**

  * **gasUsed:** Number of gas used in transaction <br/>
    **gasPrice:** Gas price in Gwei (estimate or actual)

* **Success Response:**

  * **Code:** 200 <br/>
    **Content:** 149.068949740235  // Amount of OAI for cover MATIC transaction in Polygon

* **Error Response:**

  * **Code:** 404 NOT FOUND <br/>
    **Content:** `{ "status" : "error", message : { "status" : 404 } }`

* **Sample Call:**

  ```bash
  curl -X GET http://localhost:8000/oai/matic/89546/150
  ```

---

### /oai/bnb/:gasUsed/:gasPrice

**Getting the Amount of OAI in BNB for cover a Tx in Binance Smart Chain**

---

  Returns the amount of OAI for cover a BNB transaction in Binance Smart chain (add 5% fee DUST)

* **URL**

 /oai/bnb/:gasUsed/:gasPrice

* **Method:**

   `GET`

* **URL Params**

  * **gasUsed:** Number of gas used in transaction <br/>
	**gasPrice:** Gas price in Gwei (estimate or actual)

* **Success Response:**

  * **Code:** 200 <br/>
    **Content:** 1173.326257986195  // Amount of OAI for cover BNB transaction in Binance Smart chain

* **Error Response:**

  * **Code:** 404 NOT FOUND <br/>
    **Content:** `{ "status" : "error", message : { "status" : 404 } }`

* **Sample Call:**

  ```bash
  curl -X GET http://localhost:8000/oai/bnb/89546/150
  ```

---
