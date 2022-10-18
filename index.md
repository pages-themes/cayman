---
layout: default
---

# ZoKratesPlus
ZoKratesPlus is a publicly funded project for exploring new application contexts, nurturing the zero knowledge community, and advancing the adoption of zero knowledge based technologies.

# ZoKrates
ZoKrates allows you to extend your DApp through privacy-preserving and [scalable off-chain computations](https://www.ise.tu-berlin.de/fileadmin/fg308/publications/2018/2018_eberhardt_ZoKrates.pdf) without compromising key properties of blockchains. Thereby, you can reduces transaction costs and balance between privacy and transparency. 

![ZoKrates in KYC](https://raw.githubusercontent.com/ZoKratesPlus/zokratesplus.github.io/customize_template/zokrates.png)

A [ZoKrates](https://github.com/Zokrates/ZoKrates) program written in a [domain specific language](https://zokrates.github.io/language/variables.html) is compiled into an abstraction (flattened code), which is compattible with zkSNARK proof systems. Proving and verification keys are generated in the setup phase. Subsequently, a prover runs the program and applies the proving key to generate a proof that is later verified with the verification key.


## Application Contexts

|                                      | Candidate         | Prototype | Pilot  | Deployment |
|:-------------------------------------|:------------------|:----------|:-------|:-----------|
| **Transaction Aggregation**          | zkRollups / Tezos |           |        | [Polygon](https://zokratesplus.github.io/transaction_aggregation.html)    |
| **Credential Verification / KYC**    |                   | [zkMe](https://zokratesplus.github.io/anonymous_credentials.html)      |        |            |
| **Accounting in Energy Grids**       |                   |           | [BloGPV](https://zokratesplus.github.io/accounting_energy_grids.html) |            |
| **Business Process management**      |                   |           |        | Baseline   |
| **Federated Learning**               |                   | [zkFL](https://zokratesplus.github.io/federated_learning.html)         |        |            |


Your project is missing? Feel free to [reach out](./contact.html) and share your practical zero knowledge experience or needs.
