---
layout: default
---

# ZoKratesPlus
Zero knowledge proofs (ZKPs) have been receiving increased interest in the blockchain community and beyond, mostly for reasons of both improving scalability and enhancing privacy in decentralized applications. Higher-level languages and tooling like ZoKrates make creating verifiable off-chain programs and linking them to smart contracts possible even for the non-crypto-expert, hiding some of the complexities associated with programming ZKPs. First-of-a-kind applications, for example, accounting and netting in peer-to-peer energy grids, demonstrate the enormous power and benefits when combining blockchains and ZKPs. Still, many more applications are  to be developed and learned from. 

ZoKratesPlus is a publicly funded project for validating zero knowledge proofs and supporting technologies like ZoKrates in real-world business processes. Objectives include the identification of key application contexts, nurturing the ZKP application developer community, and advancing ZoKrates and related zero knowledge based technologies towards true innovation and value creation.

We call to focus attention on real-world, practical applications of ZKPs and invite everyone interested to participate in this new validation project. ZoKratesPlus will develop general guidelines and best practices for using ZKPs and "disseminate knowledge about transacting with zero knowledge".

# ZoKrates
ZoKrates is a developer-friendly language and tool suite that allows you to easily extend your DApp through privacy-preserving and [scalable off-chain computations](https://www.ise.tu-berlin.de/fileadmin/fg308/publications/2018/2018_eberhardt_ZoKrates.pdf) without compromising key on-chainn qualities. Thereby, you can reduce transaction costs and balance between privacy and transparency. 

![ZoKrates in KYC](https://raw.githubusercontent.com/ZoKratesPlus/zokratesplus.github.io/customize_template/zokrates.png)

A [ZoKrates](https://github.com/Zokrates/ZoKrates) program written in a [domain specific language](https://zokrates.github.io/language/variables.html) is compiled into an abstraction (flattened code), which is compatible with existing zkSNARK proof systems. Proving and verification keys are generated in the setup phase. Subsequently, a prover runs the program and applies the proving key to generate a proof that is later verified with the verification key.


## Application Contexts

|                                      | Candidate         | Prototype | Pilot  | Deployment |
|:-------------------------------------|:------------------|:----------|:-------|:-----------|
| **Transaction Aggregation**          | zkRollups / Tezos |           |        | [Polygon](https://zokratesplus.github.io/transaction_aggregation.html)    |
| **Credential Verification / KYC**    |                   | [zkMe](https://zokratesplus.github.io/anonymous_credentials.html)      |        |            |
| **Accounting in Energy Grids**       |                   |           | [BloGPV](https://zokratesplus.github.io/accounting_energy_grids.html) |            |
| **Business Process management**      |                   |           |        | Baseline   |
| **Federated Learning**               |                   | [zkFL](https://zokratesplus.github.io/federated_learning.html)         |        |            |


You worked with ZKPs/ZoKrates and your project is missing? You have a current interest or plan to use ZKPs/ZoKrates? Feel free to [reach out](./contact.html) and share your practical zero knowledge experience or needs.
