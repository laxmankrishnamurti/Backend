# Run a Functioning wordpress website with Docker Compose

- Set-up
  - Wordpress
  - Database

## Step-by-step Guide

<code>1. Create a new directory for wordpress.</code>
<code>2. Make a docker-compose file.</code>

```yml
version: "3.3"

services:
  db:
    image: mysql:5.7
    volume:
      - db_data:/var/lib/mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: admin123
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress

  wordpress:
    depends_on:
      - db
    image: wordpress:latest
    ports:
      - "8000:80"
    restart: always
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
      WORDPRESS_DB_NAME: wordpress

volume:
  db_data: {}
```

```bash
# Execute the Docker Compose file
$ sudo docker compose up

[+] Running 14/34
 ⠿ db                                           Pulled                            87.4s
   ⠿ 20e4dcae4c69                               Pull                              36.4s
   ⠿ 1c56c3d4ce74                               Pull                              36.4s
   ⠿ e9f03a1c24ce                               Pull                              36.5s
   ⠿ 68c3898c2015                               Pull                              37.0s
   ⠿ 6b95a940e7b6                               Pull                              37.1s
   ⠿ 90986bb8de6e                               Pull                              37.2s
   ⠿ ae71319cb779                               Pull                              39.0s
   ⠿ ffc89e9dfd88                               Pull                              39.0s
   ⠿ 43d05e938198                               Pull                              75.6s
   ⠿ 064b2d298fba                               Pull                              75.6s
   ⠿ df9a4d85569b                               Pull                              75.7s
 ⠧ wordpress                                    Pulling                           269.7s
   ⠿ e4fff0779e6d                               Already exists                    0.0s
   ⠿ ebe65c9579cf                               Pull complete                     34.1s
   ⠋ 73fb9bdf2456 Downloading     [=================================>                 ]  70.64MB/104.3MB                                      258.0s
   ⠋ 029db5f1c17f Download                  complete                                 258.0s
   ⠋ 364fd66af37d Download                  complete                                 258.0s
   ⠋ de55dbd5d220 Download                  complete                                 258.0s
   ⠋ 18b6e8540b90 Download                  complete                                 258.0s
   ⠋ 8e94b687cf8e Download                  complete                                 258.0s
   ⠋ 67c4fe835099 Download                  complete                                 258.0s
   ⠋ 69122bd6c4de Download                  complete                                 258.0s
   ⠋ 399b24a49abd Download                  complete                                 258.0s
   ⠋ 126a489d1344 Download                  complete                                 258.0s
   ⠋ a1fef752f3f6 Download                  complete                                 258.0s
   ⠋ 37d8441a5a6f Download                  complete                                 258.0s
   ⠋ 56bbd85fd130 Download                  complete                                 258.0s
   ⠋ 2e44139c2607 Download                  complete                                 258.0s
   ⠋ 98d6faf3f1a7 Download                  complete                                 258.0s
   ⠋ affb05935c5d Download                  complete                                 258.0s
   ⠋ 1b7cfe87833c Download                  complete                                 258.0s
   ⠋ b9a329a4a02d Download                  complete                                 258.0s
   ⠋ 85da70461387 Download                  complete                                 258.0s
canceled

```

<code>It requires huge amount of data. So that's why i canceled the installation process.</code>

```yml
# Modify the yml file if any error occues

version: "3.3"

services:
  db:
    image: mysql:5.7
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: admin123
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress

  wordpress:
    depends_on:
      - db
    image: wordpress:latest
    ports:
      - "8000:80"
    restart: always
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
      WORDPRESS_DB_NAME: wordpress
```

<code>3. Verify the network</code>

```bash
$ sudo docker network ls

# Check for wordpredd_default, if it present it means installation was successful.
```

<code>4. Visit localhost:8000</code>
