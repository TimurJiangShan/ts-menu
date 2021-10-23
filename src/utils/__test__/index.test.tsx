import { setupServer } from "msw/node";
import { rest } from "msw";
import { act, renderHook } from "@testing-library/react-hooks";
import { http } from "../http";
import { useAsync } from "../useAsync";

const apiUrl = "http://localhost:8000";

const server = setupServer();

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

test("Http send async request", async () => {
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "mock" };

  server.use(
    rest.get(`${apiUrl}/${endpoint}`, (req, res, ctx) =>
      res(ctx.json(mockResult))
    )
  );

  const result = await http(endpoint);
  expect(result).toEqual(mockResult);
});

test("Http send failure async request", async () => {
  const endpoint = "test-endpoint";
  const mockResult = { message: "Please relogin" };

  server.use(
    rest.get(`${apiUrl}/${endpoint}`, (req, res, ctx) =>
      res(ctx.status(401), ctx.json(mockResult))
    )
  );

  try {
    await http(endpoint);
  } catch (error) {
    expect(error).toEqual(mockResult);
  }
});

test("Http send async request with POST", async () => {
  const endpoint = "test-endpoint";
  const token = "FAKE_TOKEN";
  const mockResult = { mockValue: "mock" };
  let request: any;
  server.use(
    rest.post(`${apiUrl}/${endpoint}`, async (req, res, ctx) => {
      request = req;
      return res(ctx.json(mockResult));
    })
  );

  await http(endpoint, {
    token,
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(""),
  });
  expect(request.headers.get("Authorization")).toBe(`Bearer ${token}`);
});

test("Add token into header", async () => {
  const token = "FAKE_TOKEN";
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "mock" };

  let request: any;

  server.use(
    rest.get(`${apiUrl}/${endpoint}`, async (req, res, ctx) => {
      request = req;
      return res(ctx.json(mockResult));
    })
  );

  await http(endpoint, { token });
  expect(request.headers.get("Authorization")).toBe(`Bearer ${token}`);
});

test("Http request get 500", async () => {
  const endpoint = "test-endpoint";
  const mockResult = { message: "server error" };

  server.use(
    rest.get(`${apiUrl}/${endpoint}`, (req, res, ctx) =>
      res(ctx.status(500), ctx.json(mockResult))
    )
  );

  try {
    await http(endpoint);
  } catch (error) {
    expect(error).toEqual(mockResult);
  }
});

/* Test custom hook useAsync */
const defaultState: ReturnType<typeof useAsync> = {
  stat: "idle",
  data: null,
  error: null,

  isIdle: true,
  isLoading: false,
  isError: false,
  isSuccess: false,

  run: expect.any(Function),
  setData: expect.any(Function),
  setError: expect.any(Function),
};

const loadingState: ReturnType<typeof useAsync> = {
  ...defaultState,
  stat: "loading",
  isIdle: false,
  isLoading: true,
};

const successState: ReturnType<typeof useAsync> = {
  ...defaultState,
  stat: "success",
  isIdle: false,
  isSuccess: true,
};

test("useAsync to handle async tasks", async () => {
  let resolve: any, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  const { result } = renderHook(() => useAsync());
  expect(result.current).toEqual(defaultState);

  let p: Promise<any>;
  act(() => {
    p = result.current.run(promise);
  });
  expect(result.current).toEqual(loadingState);
  const resolvedValue = { mockedValue: "resolved" };
  await act(async () => {
    resolve(resolvedValue);
    await p;
  });
  expect(result.current).toEqual({
    ...successState,
    data: resolvedValue,
  });
});
