# consensys-fp

https://hub.textile.io/ipns/bafzbeibfi3ve7ez725wbxdh5akyvlzu2uecsdiocgjnfixs5htzbp75qze/index.html

## Overview
The COVID-19 pandemic has pushed the healthcare system of each country to it’s limit. Massively fragmented healthcare systems in countries like India has been detrimental to controlling the outbreak. This opens up an opportunity to re-organize the system with modern technologies that can cope with the massive requirements of over 1.3 Billion Indians. One of the primary factors that have brought about the current conditions of unequal access of proper healthcare in India are accessibility and affordability. With only 13% of the country speaking English (second to only US) online platforms need to support regional languages to function effectively. People should also be able to support those in need, who are to poor to afford healthcare for themselves. Saarthi helps creating this inclusive and accessible ecosystem. Trust is one of the most crucial factors in building such a multi-dimensional healthcare system. Blockchain plays into this system perfectly as it allows people to verify whether their donations went to the correct person. It allows users to preserve their relationships and data even if the site somehow vanishes as everything is on the blockchain. This helps us build an accessible and accountable healthcare system with inherent verifiability, cutting down the friction and building a socio-economically inclusive healthcare ecosystem.

Saarthi combats these issues with a a multi-dimensional approach towards helping those in need of Financial, Medical or Computational Resources using the RSK Network.

### 1. No Language Barrier
Saarthi can be utilized to its full capabilities natively in, Hindi, Bengali, Gujarati, Kannada, Malayalam, Punjabi, Marathi, Tamil, Telugu, Urdu, Arabic.

### 2. Ease of Accessibility
Login using any phone number or social account making blockchain adoption easy and seamless. It offers a universal Medical QR that can be used by health officials to instantly gauge and keep track of the patient's medical history.

### 3. Contributors
Saarthi utilizes Tensorflow Distributed to create a medical computation network that lets users contribute extra processing power towards training and helping organizations in need of computational resources who can utilize saarthi to build applications on top of it, like one on the dashboard that lets you check if you should see a doctor according to your symptoms, dynamically detecting your location and shows you a button to call the loccal hospital for help.

### 4. Donators
With Saarthi, you can contribute towards the medical expenses of those who are less fortunate and cannot afford to pay their dues, or donate towards the choice of your fund, directly, without the need for any middle man.

### 5. Campaigns
Users can create campaigns to raise awareness for their cause and ask for donations towards their medical expenses. Campaigns help those who are underprivileged and can't afford the expenses.

### 6. Storage
Saarthi becomes a decentralized and encrypted store for your medical records with the ability to allow approved entities like hospitals to access the reports and medical data. This further helps keep track of ongoing cases without revealing private information. All medical records stored are encrypted and can only be accessed by the owners. You can also opt-in to contribute your data towards medical research, utilizing Saarthi's medical computation network to help others in need of a cure.

### 7. Reports
Saarthi empowers whistleblowers and enables those who would like to report incidents anonymously, directly to relevant authorities. You can attach a variety of information like location and images with these reports enabling relevant authorities to take appropriate action without revealing your identity.

### 8. Decentralization.
Saarthi is completely open source and decentralized at all layers of the stack making it easy to access and censorship-resistant. Saarthi utilizes Textile, RIF and RNS to deploy, store and serve the website. With RSK we utilize their capability to overcome the above concerns with smart contracts expanding the Bitcoin Network. RSK also accounts for scalability, thanks to the capability of processing over 400 transactions per second. Saarthi also pairs up with its RNS Resolver Extension available here to allow anyone to access Saarthi from saarthi.rsk

## Directory Structure

```
📦 Saarthi
 ┣ 📂 .github
 ┃  ┣ 📂workflows (Handles the Github Actions)
 ┃  ┃  ┣ 📜textile-deploy.yml (Deploy Frontend to IPFS)
 ┃  ┃  ┗ 📜truffle-test.yml (Run SMart contract Tests)
 ┣ 📂 .textile (Configuration for textile bucket)
 ┣ 📂 build (Recent build of the Smart Contracts)
 ┣ 📂 contract (Solidity Smart Contracts)
 ┣ 📂 migrations (Truffle deployment migrations)
 ┣ 📂 test (Smart Contract Tests)
 ┣ 📂 ui (Application Frontend UI)
 ┣ 📜 avoiding_common_attacks.md
 ┣ 📜 design_pattern_decisions.md
 ┣ 📜 package.json (project dependencies)
 ┣ 📜 README.md (Project Documentation)
 ┣ 📜 setupFunds.js (Utility Script)
 ┗ 📜 truffle-config.yml (Truffle Project Config)
```

## Running the project

### Smart Contracts
1. Run `ganache-cli` to start a local chain.
1. In the projects root directory, run `truffle console`

### Frontend
1. In the projects root directory, run `npx static-server ./ui -p 80`

## Project Demo
YouTube 👉 [https://youtube.com/watch?v=NjAgOeWCN74](https://www.youtube.com/watch?v=NjAgOeWCN74)

## Avoiding Common Attacks
Documented here 👉 [avoiding_common_attacks.md](avoiding_common_attacks.md)

## Deployed Addresses
Documented here 👉 [deployed_addresses.md](deployed_addresses.md)

## Design Pattern Decisions
Documented here 👉 [design_pattern_decisions.md](design_pattern_decisions.md)
