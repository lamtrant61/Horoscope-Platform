# Về dự án
Đây là bản demo code để pin vào profile nên sẽ không commit toàn bộ code và những phần quan trọng sẽ bị ẩn đi. Do đó pipeline sẽ chỉ có 1 commit toàn bộ dự án.

# Horoscope Nuxt 3

Ứng dụng Tử Vi Thiên Mã dùng Nuxt 3 để lập lá số tử vi online, lưu lá số, luận giải bằng AI, quản lý tài khoản và xử lý thanh toán nạp tiền.

Link production: https://tuvithienma.com/

## Tính năng chính

- Lập lá số tử vi theo thông tin ngày giờ sinh.
- Xem, lưu và xóa các lá số đã tạo.
- Luận giải lá số trọn đời và luận giải vận hạn theo năm bằng OpenAI.
- Đăng ký, đăng nhập, đăng xuất và xác thực bằng JWT.
- Quản lý số dư người dùng, chi phí luận giải và lịch sử thanh toán.
- Tạo QR thanh toán và kiểm tra giao dịch qua SePay.
- Trang quản trị danh sách người dùng và thanh toán.
- SEO cơ bản với sitemap, robots và meta cho các trang chính.
- Unit test bằng Vitest cho utils, composables, store và component.

## Công nghệ sử dụng

- Nuxt 3, Vue 3, TypeScript
- Tailwind CSS, SCSS, Element Plus
- Sequelize, MySQL
- OpenAI API
- JWT, bcrypt
- Vitest, Vue Test Utils

## Cấu trúc thư mục

```text
.
|-- assets/              # SCSS, CSS, font, logo, hình ảnh
|-- components/          # Vue components dùng lại trong giao diện
|-- composables/         # Composables phía client
|-- layouts/             # Layout Nuxt
|-- pages/               # Route pages của Nuxt
|-- plugins/             # Nuxt plugins
|-- public/              # Static assets public
|-- server/
|   |-- api/             # API routes
|   |-- constants/       # Prompt AI và hằng số nội dung
|   |-- database/        # Sequelize models, migrations, seeders, data
|   |-- middleware/      # CORS, auth, logger
|   |-- types/           # Kiểu dữ liệu phía server
|   `-- utils/           # Helper xử lý horoscope, OpenAI, response, DB
|-- stores/              # Pinia stores
|-- tests/               # Unit tests
|-- types/               # Shared types
`-- utils/               # Shared utilities
```

Thư mục `app/` là project Nuxt lồng bên trong, được dùng bởi các lệnh `dev-app`, `generate` và `preview`.

## Yêu cầu môi trường

- Node.js phiên bản tương thích Nuxt 3
- npm, pnpm hoặc bun
- MySQL
- OpenAI API key nếu dùng tính năng luận giải AI
- Tài khoản/cấu hình SePay nếu dùng tính năng thanh toán

Repo hiện có nhiều lockfile (`package-lock.json`, `pnpm-lock.yaml`, `bun.lockb`). Nên thống nhất một package manager trong quá trình phát triển. Các lệnh bên dưới dùng `npm` vì `package-lock.json` đang có sẵn.

## Cài đặt

```bash
npm install
```

Tạo file `.env` từ mẫu `.env.dev` và điền thông tin thật:

```bash
cp .env.dev .env
```

Các biến môi trường chính:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=horoscope-nuxt3
DB_PORT=3306
DB_DIALECT=mysql

JWT_SECRET=
OPENAI_API_KEY=

SALT=
BCRYPT_SALT_ROUNDS=10

COST_HOROSCOPE=50000
COST_YEAR_HOROSCOPE=20000
TOKEN_SEPAY=
ACCOUNT_NUMBER=
```

Không commit `.env` hoặc secret thật lên repository.

## Database

Tạo database, chạy migration và seed dữ liệu mẫu:

```bash
npm run sequelize-migrate
```

Các model chính nằm trong `server/database/models/`:

- `User`
- `Horoscope`
- `Solve`
- `Payment`
- `Transaction`

Một số lệnh Sequelize khác:

```bash
npm run sequelize-undo
npm run sequelize-seed
```

## Chạy dự án

Chạy Nuxt app chính ở môi trường development:

```bash
npm run dev
```

Chạy với host `0.0.0.0` để test qua mạng nội bộ:

```bash
npm run dev-host
```

Build production:

```bash
npm run build
```

Các lệnh cho project lồng trong `app/`:

```bash
npm run dev-app
npm run generate
npm run preview
```

## Test và lint

Chạy unit test:

```bash
npm run test
```

Chạy test ở watch mode:

```bash
npm run test:watch
```

Chạy coverage:

```bash
npm run test:coverage
```

Kiểm tra lint:

```bash
npm run lint
```

Tự động sửa lỗi lint có thể fix:

```bash
npm run lint:fix
```

## Routes và API đáng chú ý

Một số trang chính:

- `/`: trang chủ Tử Vi Thiên Mã.
- `/lasotuvi`: lập lá số và xem lá số đã lưu.
- `/horoscope/login`: đăng nhập.
- `/horoscope/solve/[id]`: xem luận giải lá số.
- `/payment`: thanh toán/nạp tiền.
- `/manage`: trang quản trị user và payment.
- `/post` và `/post/[slug]`: nội dung bài viết.

Một số API chính:

- `POST /api/register`
- `POST /api/login`
- `GET /api/user/role`
- `GET /api/user/balance`
- `GET /api/horoscope`
- `POST /api/horoscope/save`
- `DELETE /api/horoscope/save/[id]`
- `POST /api/openai`
- `POST /api/openai/year`
- `POST /api/openai/solve`
- `POST /api/payment`
- `POST /api/payment/createqr`
- `POST /api/payment/check`
- `GET /api/manage/user`
- `PUT /api/manage/user`
- `GET /api/manage/payment`

## Quy ước phát triển

- Dùng TypeScript và Vue SFC khi có thể.
- Format theo `.editorconfig`: 2 spaces, LF, UTF-8, có final newline.
- Prettier dùng single quote và không dùng semicolon.
- Component Vue đặt tên kebab-case khi thêm file mới.
- Test đặt gần khu vực tính năng hoặc theo cấu trúc `tests/unit/`, tên file `*.test.ts` hoặc `*.spec.ts`.
- Mock network, database, OpenAI, Telegram và payment trong unit test.

## Ghi chú bảo mật

- Không hard-code secret trong source code.
- Luôn kiểm tra kỹ thay đổi liên quan đến OpenAI, JWT, payment, Telegram và database.
- Các route quản trị và thanh toán nên được kiểm thử xác thực/ủy quyền trước khi deploy.
- Khi thay đổi prompt trong `server/constants/`, cần kiểm tra lại chi phí, độ dài phản hồi và hành vi với dữ liệu người dùng.
