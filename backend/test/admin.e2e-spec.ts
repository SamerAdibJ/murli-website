import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'node:crypto';
import { AppModule } from './../src/app.module';
import { UsersService } from './../src/users/users.service';

describe('AdminModule (e2e)', () => {
  let app: INestApplication;
  let usersService: UsersService;
  let adminToken: string;
  let memberToken: string;
  let pendingUserId: string;
  let memberId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    usersService = moduleFixture.get<UsersService>(UsersService);
    await app.init();

    const adminId = randomUUID();
    memberId = randomUUID();
    pendingUserId = randomUUID();

    const adminPassword = 'AdminPass123!';
    const memberPassword = 'MemberPass123!';
    const pendingPassword = 'PendingPass123!';

    const admin = await usersService.create({
      id: adminId,
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      passwordHash: await bcrypt.hash(adminPassword, 10),
    });

    await usersService.updateStatus(admin.id, 'active');
    await usersService.updateRole(admin.id, 'admin');

    const member = await usersService.create({
      id: memberId,
      firstName: 'Member',
      lastName: 'User',
      email: 'member@example.com',
      passwordHash: await bcrypt.hash(memberPassword, 10),
    });

    await usersService.updateStatus(member.id, 'active');

    const pendingUser = await usersService.create({
      id: pendingUserId,
      firstName: 'Pending',
      lastName: 'User',
      email: 'pending@example.com',
      passwordHash: await bcrypt.hash(pendingPassword, 10),
    });

    const adminLogin = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: admin.email, password: adminPassword })
      .expect(200);

    adminToken = adminLogin.body.data.accessToken;

    const memberLogin = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: member.email, password: memberPassword })
      .expect(200);

    memberToken = memberLogin.body.data.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should deny non-admin access to admin routes', async () => {
    await request(app.getHttpServer())
      .get('/admin/users/pending')
      .set('Authorization', `Bearer ${memberToken}`)
      .expect(403);
  });

  it('should allow admin to list pending users', async () => {
    const response = await request(app.getHttpServer())
      .get('/admin/users/pending')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(
      response.body.data.some((u) => u.email === 'pending@example.com'),
    ).toBe(true);
  });

  it('should allow admin to approve a pending user', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/admin/users/${pendingUserId}/approve`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.status).toBe('active');
  });

  it('should allow admin to promote an active user to admin', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/admin/users/${memberId}/promote`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.role).toBe('admin');
  });
});
