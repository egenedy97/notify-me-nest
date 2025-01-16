import { UserRepository } from './user.repository';
import { PrismaService } from '../../providers/prisma.service';
import { IUser } from './interface/user.interface';
import { User, userRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let prismaServiceMock: jest.Mocked<PrismaService>;

  beforeEach(() => {
    prismaServiceMock = {
      user: {
        create: jest.fn(),
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        update: jest.fn(),
      },
    } as unknown as jest.Mocked<PrismaService>;
    userRepository = new UserRepository(prismaServiceMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const user: IUser = {
        email: 'test@example.com',
        name: 'Test User',
        phone: '123456789',
        role: userRole.USER,
        password: 'password',
      };
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const expectedUser: User = {
        id: 1,
        ...user,
        password: hashedPassword,
      };

      prismaServiceMock.user.create.mockResolvedValueOnce(expectedUser);

      const createdUser = await userRepository.createUser(user);

      expect(createdUser).toEqual(expectedUser);
      expect(prismaServiceMock.user.create).toHaveBeenCalledWith({
        data: {
          ...user,
          password: hashedPassword,
        },
      });
    });
  });

  // Similar tests for other methods like findUser, findUserWithEmail, findUserWithPhone, and updateUser
});
