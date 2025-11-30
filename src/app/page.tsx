  (stronger)</option>
        </select>

        <input
          className="flex-1 bg-black border border-neutral-800 p-2 rounded text-white text-sm sm:text-base"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          type="submit"
          className="px-3 sm:px-4 py-2 bg-white text-black rounded text-sm sm:text-base"
          disabled={loading}
        >
          Send
        </button>
      </form>
    </main>
