# Running Tests

All test files locate at [\_\_test\_\_/cosmos/src](https://github.com/cosmology-tech/sign/tree/main/__test__/cosmos/src)

## 1.Prepare

To run test, make sure you've installed tools listed below in your running environment.

- docker: https://docs.docker.com/get-docker/
- kubectl: https://kubernetes.io/docs/tasks/tools/
- helm: https://helm.sh/docs/intro/install/

Then run Docker Desktop and enable Kubernetes in Docker Desktop:

From the Docker Dashboard, select the Settings.

1. Select `Kubernetes` from the left sidebar.
2. Next to `Enable Kubernetes`, select the checkbox.
3. Select `Apply & Restart` to save the settings and then click Install to confirm.

> Note: You might want to increase the memory and cpu allocated to the cluster, in Settings, Resources

Finally setup the Starship Helm chart

```sh
helm repo add starship https://cosmology-tech.github.io/starship/
helm repo update
helm search repo starship/devnet --version 0.1.45
```

## 2.Start Server

At the root directory, run

```sh
yarn test:cosmos:start-server
```

> `Server` is a mocked cosmos chain application running locally that potentially supports all chain services. It uses [`starship/devnet`](https://github.com/cosmology-tech/starship) as template.
>
> Settings of server locate in [`__test__/cosmos/.starship.yaml`](https://github.com/cosmology-tech/sign/blob/main/__test__/cosmos/.starship.yaml)
>
> For more information of configuration, go to the [Starship Documentation](https://starship.cosmology.tech/config)

## 3.Run Tests

```sh
yarn test:cosmos
```

## 4.Stop Server

```sh
yarn test:cosmos:stop-server
```

## All Tests

| File                                                                                              | Descriptions                 |
| ------------------------------------------------------------------------------------------------- | ---------------------------- |
| [bank.spec.ts](https://github.com/cosmology-tech/sign/blob/main/__test__/cosmos/src/bank.spec.ts) | `Send tokens`                |
| [gov.spec.ts](https://github.com/cosmology-tech/sign/blob/main/__test__/cosmos/src/gov.spec.ts)   | `Submit a proposal` ; `Vote` |
