# Arquinator

### Docker - Iniciar o Postgres:

```sh
$ sudo docker run --name arquinator -ePOSTGRES_PASSWORD=arquinator2020 -p 5432:5432 -d postgres
```

#### Acessa pelo [postbird](https://www.electronjs.org/apps/postbird):

- username: postgres
- password: arquinator2020

E por fim crie uma database para ser usada.

### Criar migrations:

```sh
$ yarn sequelize migration:create --name=create-users
```

### Comandos para migrate:

```sh
$ yarn migrate
```

Esse comando irá rodar todas as migrates.

### Comando para desfazer migrate:

```sh
$ yarn migrate:undo
```

O comando acima desfaz a última migrate feita. Para desfazer todas as migrates:

```sh
$ yarn migrate:undo:all
```
