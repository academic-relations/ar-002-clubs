# [ Academic Relations #002 ] SPARCS Clubs

## How to run (as of 24.05.17)

1. Login to `github` if not already done so.
2. Run `git submodule init` && `git submodule update --remote`

<hr/>

### 환경변수 복사하기
`.env.example`을 `.env`로 복사합니다. DB 설정 등 실행에 필요한 환경변수가 포함되어 있습니다.

### 패키지 설치하기
프로그램 실행에 필요한 의존성 패키지들을 설치합니다.
```bash
pnpm i
```

### 로컬 DB 세팅하기
백그라운드에 Docker가 실행되어 있는지 확인합니다.
그리고, 아래 커맨드를 통해 로컬 DB를 실행하고, 현재 Schema와 동기화할 수 있습니다.
```bash
pnpm generate
```

### 개발 모드로 실행하기
```bash
pnpm dev
```
