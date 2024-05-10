import { JwtService } from "@nestjs/jwt";
import { hash } from "bcryptjs";
import { AuthenticateController } from "src/controllers/auth/authenticate.controller";
import { InMemoryUsersRepository } from "src/repositories/in-memory/in-memory-users.repository";
import { beforeEach, describe, it, expect } from "vitest";

describe('Authenticate case', async () => {
  let usersRepository: InMemoryUsersRepository;
  let jwtService: JwtService;
  let sut: AuthenticateController;

  const privatekey = 'LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tDQpNSUlFdlFJQkFEQU5CZ2txaGtpRzl3MEJBUUVGQUFTQ0JLY3dnZ1NqQWdFQUFvSUJBUUN6RENlaW54Z1RhcXA2DQpXbHpOaEwrNE5xTTZkNG5MdWFDQzR2aXlsZjBWZ21MdkZUTUtFdURCeDZEd3Mvb05mdlFhN2tQVmJDWEViTnluDQorYTFBQVYxS2JaN2Fka2NBR0QzOW83R0ZhSGkyeFFWUzVHTnZYQTlqVm50ZTNmNmJlb2hQVWRnNytrWGRZUFR4DQpRTXdoMVg4ZUg4TUhaa2pXSklJd1lnWEk0S29kdTYzYjJKUkhFUGdmS1BjdC92RUlEbEhSa3NRSnkwZ1dFR05VDQpRV29kZGtXZ2Rxd1lKV04yQU5wRVFLL1BId0JCVWxPMzU4Y1UrSFV4SDY5Vi9qQVNWS1ZYcUVVUktlTXRtUlBHDQo3T0lBZk1aUWxoOTFZMHUzTmFXYndzSGsvWjNiNDFzeW9aK1pJN00rYi96VzBHVlV0THVrbDlrckNGQWF5d1ZqDQpwbm9WSVh0ZkFnTUJBQUVDZ2dFQUNGRDBObFYxWk5GN2dadFkzQ0xpVk1nVTVNNVFsQ25YRHIxRUYrZG5qZXcwDQpkQzVqNUgvaitKd3hHWDBDakVYdFNLTHdlNlUrUzlWU21tcTZaVktxNXA0WTFzVFBuMjJBMDVzYXo3dCtmOTYrDQoxSTdQSDRrREhmWVNYT0dxeGNYM050ZnlWemJVcitlaytOK3RtNVN6QnM4cTI5a2dZUEhwS2g0amJxVWd3YWkyDQpEM0RLYkxXSWVmU0NGWU5QS0RRbFdFbmd4UmF1OUl0dWQ5VE5mQ0FzRllwUTVUdVpoOWFGNHBwSmJ4WlFsdkNaDQpzQ2NqWXgwbUdTTFhCWks5Nkk3ZGtXZk96aGIyZndWRVYrV3lXSExMbmpRbTVBK3oxQjhzV3NibkZ4NWFBQ2NXDQo1OFZwVTUyYU5NbUpHSlgyak04TnM4K21Xb21ieXM1bXJXREo3YVlTb1FLQmdRRGViM0R3UW5PcjRyTU5HZ21IDQo5c3phdENGV3F4b3VNYW5jV2x0dU9JckdrMXZZRHYxVzAwOFN3YmJWK0tHNkNYWW93WVhjSnpCV2xvdUNpZFE0DQpnT2h6VmpjM2R0UmhkREtlbDcvL2JPUXR6dFdUL0djYTJ5eGRwY0N1NWEzV2Q5a3BoSDVyLytsZVpzd2xaRFFKDQpXTVVqNUFVRldjcE9pQy9FVEZXcFBGZlU5UUtCZ1FET0VLb1hSdU9CYmlvNG9CNjdNSmw0d3E0NS9OaDB5UE9QDQp5TmhxMC9Yb00wQ2k5WnFIZC9lYkFyRTA0dlVQUjVJYmJMbkJzdDNpTWpkUXdleHpGZVloS2JHZnh1MHNjc2E0DQpzK0d0NnZiSU1Ra2RjN2lWZFM2VTFScDViZDJsTkMzdWZ3UFM5eXhpeFNqbHZBWmwxODVxR083Um5YQ2JSYmtSDQpyV1VPNERBNmd3S0JnUUNLZ2VoWW8zaDF1dGQxdkJYZFJUQXdxMlBySE9aVGgzZFhFQ2pJeklxVnRtTEZlaWdFDQpyZFlhUHVmRCsydHhkYnpQQ2hwNWlTbVBjWFR6MXpGLzhiMU5QSTFyaXlJYWdRbVlPYlJEc0NHeDZJNlQ5T0tiDQpGWWxkMHYzVnFvMkI4K1VVOWp6bXNWYzNBbG55bXAvUWhpZFQvd09sWGxFY2I2OFcwOVd2YVRUa0ZRS0JnQmNxDQp1SFMxZTQ1cG5FV1JldU1BcThCdjRyYVNQcU9pay85dVRTWjFmZ2dFK3hkWEZYQjFoRmpoREpzdGlPK1cxRTVSDQpBdkZMOHJZamZ5U05LTkFuZmgvc1dCUG1nWE9sMDhHZ041Y2QrM0MyVXBnRkVwTjdBU21xYTdlTEtvZ1FQYm02DQpmZXVSN21PTVZ2UzlGdHNNVUNDTmZRd0Q3MDBGb2JEakZhRitndTJSQW9HQVU3ZzBtRHhEc2tkRys3NUUxdDlqDQpRTkZ3YlhNRm81KytaSDdLaDBqdzZwSTQwVkxGTVRUM2NVQWZDbmNiblovUFhieVdESWRCM1JsVHBxUXNQZ3pCDQpQeitTNHhZbVpVTmRHUUFTMnVUcXRJdGdvZkR0bUhOdjFmTkxBZFFoaFVIaG1UQzhYR0NuMHRrV1hrSE5haDlvDQp2eTdjVTdkUXNzS3hZa2pzN3phSXEzQT0NCi0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0='

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();

    jwtService = new JwtService({
      secret: Buffer.from(privatekey, 'base64'),
      signOptions: { algorithm: 'RS256' },
    });
    
    sut = new AuthenticateController(usersRepository, jwtService);
  });

  it('should be able to authenticate', async () => {

    const passwordHashed = await hash('123456', 8)

    await usersRepository.createUser(
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: passwordHashed
      }
    )
    

    const { access_token } = await sut.handle(
      {
        email: 'john@example.com',
        password: '123456'
      }
    );

    expect(access_token).toBeTypeOf('string');
  });
});
